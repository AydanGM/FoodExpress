import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { afterEach, describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// mocks reutilizables
let mockLogin = vi.fn();
const mockNavigate = vi.fn();

// mock del contexto Auth (useAuth), la implementación lee mockLogin actualizado en cada test
vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({ login: mockLogin }),
}));

// mock parcial de react-router-dom para controlar useNavigate pero mantener el resto del modulo
// Esto permite renderizar <Link> dentro de MemoryRouter sin errores
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

// Se importa el componente despues de definir los mocks
import IniciarSesion from "../pages/IniciarSesion";

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
  mockLogin = vi.fn();
});

describe("IniciarSesion page", () => {
  it("muestra errores de validación y no llama a login cuando el formulario está vacío", () => {
    // Render dentro de MemoryRouter para que <Link> funcione
    render(
      <MemoryRouter>
        <IniciarSesion />
      </MemoryRouter>
    );

    // Envia un formulario vacio
    fireEvent.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));

    // Debe mostrar un mensaje de validacion global
    expect(screen.getByText(/Por favor corrige los errores/i)).toBeInTheDocument();

    // No debe haberse llamado a login del contexto
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("llama a login y navega a '/' cuando login es exitoso", async () => {
    // Se prepara el mock de login para simular exito
    mockLogin.mockReturnValue({ exito: true, mensaje: "Ingreso correcto" });

    render(
      <MemoryRouter>
        <IniciarSesion />
      </MemoryRouter>
    );

    // Rellenar campos
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
      target: { value: "Password123" },
    });

    // Enviar formulario
    fireEvent.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));

    // login debe ser llamado con los valores del formulario
    expect(mockLogin).toHaveBeenCalledWith("user@example.com", "Password123");

    // esperar mensaje de exito mostrado en la UI
    expect(await screen.findByText(/Ingreso correcto/i)).toBeInTheDocument();

    // esperar que la navegacion ocurra (setTimeout interno en el componente)
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    }, { timeout: 3500 });
  });

  it("muestra mensaje de error cuando login falla y no navega", async () => {
    // Simular login fallido
    mockLogin.mockReturnValue({ exito: false, mensaje: "Credenciales incorrectas" });

    render(
      <MemoryRouter>
        <IniciarSesion />
      </MemoryRouter>
    );

    // Rellenar campos
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: "bad@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
      target: { value: "wrongpass" },
    });

    // Enviar
    fireEvent.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));

    // esperar mensaje de error mostrado en la UI
    expect(await screen.findByText(/Credenciales incorrectas/i)).toBeInTheDocument();

    // asegurar que no hubo navegación (espera el tiempo que usaría setTimeout)
    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled();
    }, { timeout: 2500 });
  });
});