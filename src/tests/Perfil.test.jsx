import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

/*
  Mock dinámico de useAuth:
  - Declaramos `mockUsuario` antes de vi.mock para que la implementación mock
    pueda leer su valor actualizado en cada test
  - useAuth() devolverá { usuario: mockUsuario }
*/
let mockUsuario = null;
vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({ usuario: mockUsuario }),
}));

// se importa el componente bajo prueba después de definir el mock
import Perfil from "../pages/Perfil";

afterEach(() => {
  cleanup();
  // restaura el valor por defecto para evitar contaminación entre tests
  mockUsuario = null;
});

describe("Perfil page", () => {
  it("muestra aviso y enlace a iniciar sesión cuando no hay usuario", () => {
    // Renderizar dentro de MemoryRouter porque Perfil usa <Link />
    render(
      <MemoryRouter>
        <Perfil />
      </MemoryRouter>
    );

    // Verifica que se muestra el alert informando que no hay sesión iniciada
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(/No has iniciado sesión/i)).toBeInTheDocument();

    // El enlace apunta a /iniciar-sesion
    const link = screen.getByRole("link", { name: /Iniciar sesión/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/iniciar-sesion");
  });

  it("muestra los datos del usuario cuando hay usuario autenticado", () => {
    // Preparar mock de usuario antes de renderizar
    mockUsuario = { nombre: "Test User", correo: "test@example.com" };

    render(
      <MemoryRouter>
        <Perfil />
      </MemoryRouter>
    );

    // El nombre y correo del usuario deben aparecer en la UI
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();

    // Imagen de perfil con alt correcto
    expect(screen.getByAltText(/Foto de perfil/i)).toBeInTheDocument();

    // Botón de editar perfil visible
    expect(screen.getByRole("button", { name: /Editar perfil/i })).toBeInTheDocument();
  });
});