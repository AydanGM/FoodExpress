//utilidades para montar el componente y consultar el DOM
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest"; //utilidades de mocking
import { MemoryRouter } from "react-router-dom";

// mocks simulando funciones etc etc etc
const mockRegistro = vi.fn();
// evita navegacion real durante el test
const mockNavigate = vi.fn();

// remplaza el useAuth por una version que devuelve mockRegistro
vi.mock("../context/AuthContext", () => ({ useAuth: () => ({ registro: mockRegistro }) }));
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

// importa el componente bajo prueba después de definir los mocks
import Registro from "../pages/Registro";

/*
  Test de validación inválida
  - Intenta enviar el formulario sin completar campos
  - Comprueba que se muestra el mensaje de error esperado y que no se llamó a registro
*/
test("muestra errores de validación y no llama a registro cuando inválido", () => {
  render(
    <MemoryRouter>
      <Registro />
    </MemoryRouter>
  );

  // Simula click en el botón de submit enviando el formulario vacio
  fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));
  // Comprueba que se muestra un mensaje de error en la UI
  expect(screen.getByText(/Por favor corrige los errores/i)).toBeInTheDocument();
  // Verifica que la función de registro no se invoco
  expect(mockRegistro).not.toHaveBeenCalled();
});

/*
  Test de envio valido
  - Rellena campos del formulario con valores válidos
  - Envía el formulario y comprueba que registro() fue llamado
*/
test("envía formulario válido y llama a registro y navigate", () => {
  render(
    <MemoryRouter>
      <Registro />
    </MemoryRouter>
  );

  // Llena el formulario
  fireEvent.change(screen.getByLabelText(/Nombre completo/i), { target: { value: "Nombre Valido" } });
  fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: "user@example.com" } });
  // Regex exacto para no coincidir con "Confirmar contraseña"
  fireEvent.change(screen.getByLabelText(/^Contraseña$/i), { target: { value: "Aa1!aaaa" } });
  fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), { target: { value: "Aa1!aaaa" } });

  // se envia el formulario
  fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

  // Verificar que la función registro del contexto fue llamada con los datos
  expect(mockRegistro).toHaveBeenCalled();
});