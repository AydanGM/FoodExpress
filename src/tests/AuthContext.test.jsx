import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { useState } from "react";

// afterEach / cleanup: limpiar el DOM y localStorage entre tests para evitar problemas
afterEach(() => {
    cleanup();
    localStorage.clear();
});

//Testcomponent: componente auxiliar que consume el contexto (useAuth)
// expone acciones (registro, login, logout) mediante botones y muestra estado via data-testid.

function TestComponent() {
    const { usuario, autenticado, registro, login, logout } = useAuth();
    const [loginRes, setLoginRes] = useState(null);

    return (
        <div>
            {/* se muestra el estado del contexto para aserciones */}
            <div data-testid= "usuario">{usuario ? usuario.nombre : "null"}</div>
            <div data-testid= "autenticado">{autenticado ? "true" : "false"}</div>

            {/* botones que disparan las funciones del contexto */}
            <button
                data-testid= "btn-reg"
                onClick={() =>
                    registro({nombre: "Marco Corrales", correo: "markgamer@gmail.com", password: "Password."})
                }
            >
                reg
            </button>

            {/* Al hacer click guardamos el resultado de login en el estado local para poder asertarlo */}
            <button
                data-testid= "btn-login"
                onClick={() => setLoginRes(login("markgamer@gmail.com", "Password."))}
            >
                login
            </button>
            {/* mostramos el resultado del login (ej. {exito:true}) */}
            <div data-testid= "login-result">{loginRes ? JSON.stringify(loginRes) : ""}</div>

            {/* boton de logout que limpia el usuario en el contexto y en localStorage */}
            <button data-testid= "btn-logout" onClick={logout}>
                logout
            </button>    
        </div>
    );
}

describe("AuthContext", () => {
    it("registro guarda el usuario en localStorage y actualiza el contexto", () => {
        // se monta el provider alrededor del TestComponent para dar acceso al contexto
        render(
            <AuthProvider>
                <TestComponent/>
            </AuthProvider>
        );
        
        // estado inicial esperado
        expect(screen.getByTestId("usuario").textContent).toBe("null");
        expect(screen.getByTestId("autenticado").textContent).toBe("false");

        // simula un click en el botón de registro
        fireEvent.click(screen.getByTestId("btn-reg"));

        // despues del registro, el contexto debe contener el nuevo usuario y autenticado debe ser true
        expect(screen.getByTestId("usuario").textContent).toBe("Marco Corrales");
        expect(screen.getByTestId("autenticado").textContent).toBe("true");

        // se verifica la persistencia en localStorage: 'usuarios' debe existir y contener el correo
        const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
        expect(Array.isArray(usuarios)).toBe(true);
        expect(usuarios.length).toBeGreaterThan(0);
        expect(usuarios[0].correo).toBe("markgamer@gmail.com");
    });

    it("login con credenciales existentes autentica y devuelve exito true", () => {
        //Se pre-pobla usuarios para que login los encuentre
        localStorage.setItem(
            "usuarios",
            JSON.stringify([{ nombre: "Marco Corrales", correo: "markgamer@gmail.com", password: "Password."}])
        );

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );
        
        // Simula click en login, el TestComponent guarda el resultado en login-result
        fireEvent.click(screen.getByTestId("btn-login"));

        //Resultado de login que aparece en login-result
        expect(screen.getByTestId("login-result").textContent).toContain('"exito":true');
        expect(screen.getByTestId("usuario").textContent).toBe("Marco Corrales");
        expect(screen.getByTestId("autenticado").textContent).toBe("true");
    });

    it("login con credenciales incorrectas no se autentica y devuelve exito=false", () => {
        // se pre-pobla con otro usuario usando credenciales que no coinciden
        localStorage.setItem(
            "usuarios",
            JSON.stringify([{ nombre: "Marco", correo: "x@x.com", password: "wrong"}])
        );

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        // Se intenta logear con credenciales que no existen -> exito:false
        fireEvent.click(screen.getByTestId("btn-login"));

        expect(screen.getByTestId("login-result").textContent).toContain('"exito":false');
        //El usuario no es autenticado
        expect(screen.getByTestId("autenticado").textContent).toBe("false");
    });

    it("logout limpia el usuario en el context", () => {
        //simular un usuario ya autenticado en localStorage para que el useEffect lo cargue
        localStorage.setItem("usuario", JSON.stringify({ nombre: "Persistente", correo: "p@p.com"}));

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        // usuario inicial cargado por useEffect -> autenticado debe ser true
        expect(screen.getByTestId("usuario").textContent).toBe("Persistente");
        expect(screen.getByTestId("autenticado").textContent).toBe("true");

        // invocar logout y verificar limpieza
        fireEvent.click(screen.getByTestId("btn-logout"));
        expect(screen.getByTestId("usuario").textContent).toBe("null");
        expect(screen.getByTestId("autenticado").textContent).toBe("false");
    });
});