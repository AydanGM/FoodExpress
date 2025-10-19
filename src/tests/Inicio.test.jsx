import {render, screen, cleanup} from "@testing-library/react";
import { describe, expect, test, vi, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { NotificationProvider } from "../context/NotificationContext";

//Mockear componentes para aislar la prueba de inicio
//vi.mock reemplaza el modulo importado por una implementacion minima 
vi.mock("../components/Carousel_Inicio.jsx", () => ({
    default: () => <div data-testid= "carousel-inicio">CarouselInicioMock</div>,
}));
vi.mock("../components/Carousel_Promos", () => ({
    default: () => <div data-testid= "carousel-promos">CarouselPromosMock</div>,
}));
vi.mock("../components/Usuarios_reviews", () => ({
    default: () => <div data-testid= "usuarios-reviews">UsuariosReviewsMock</div>,
}));

//importa el componente bajo prueba (usando las versiones mockeadas)
import Inicio from "../pages/Inicio";

afterEach(cleanup);

const renderWithProviders = () => {
  return render(
    <MemoryRouter>
      <NotificationProvider>
        <Inicio />
      </NotificationProvider>
    </MemoryRouter>
  );
};

describe("Inicio", () => {
    test("muestra el titulo principal", () => {
        //render monta el componente en un DOM virtual (JSDOM)
        renderWithProviders();
        expect(screen.getByRole("heading", {name: /Bienvenido a Food Express/i})).toBeInTheDocument();
    });

    test("muestra el parrafo descriptivo", () => {
        renderWithProviders();
        //getbytext busca texto visible exacto
        expect(screen.getByText(/Tu plataforma de entrega de comida rápida favorita\./i)).toBeInTheDocument();
    });

    test("renderizaaa componentes hijos (mocked)", () => {
        renderWithProviders();
        //getByTestId accede a los elementos creados por los mocks
        expect(screen.getByTestId("carousel-inicio")).toBeInTheDocument();
        expect(screen.getByTestId("carousel-promos")).toBeInTheDocument();
        expect(screen.getByTestId("usuarios-reviews")).toBeInTheDocument();
    });

    test("contenedor raiz tiene las clases esperadas", () => {
        //render devuelve un objeto que incluye 'container' con el DOM raiz
        const { container } = renderWithProviders();
        // querySelector localiza el div raíz por la clase "container"
        const root = container.querySelector("div.container");
        expect(root).toBeInTheDocument();
        // verificamos que las clases CSS requeridas estén presentes
        expect(root.className).toContain("text-center");
        expect(root.className).toContain("my-5");
    });
});
