import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { afterEach, describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Carrito from "../pages/Carrito";

// Mock de useCart para controlar el estado en los tests
const mockUpdateQuantity = vi.fn();
const mockClearCart = vi.fn();
let mockItems = [];

vi.mock("../context/CartContext", async () => {
  const actual = await vi.importActual("../context/CartContext");
  return {
    ...actual,
    useCart: () => ({
      items: mockItems,
      updateQuantity: mockUpdateQuantity,
      clearCart: mockClearCart,
      getTotal: () => mockItems.reduce((sum, i) => sum + (i.PRECIO * i.quantity), 0),
      // Mockeamos las otras funciones para que no fallen si se llaman
      removeFromCart: vi.fn(),
    }),
  };
});

beforeEach(() => {
  cleanup();
  vi.clearAllMocks();
  mockItems = []; // Resetear items entre tests
});

afterEach(cleanup);

const renderWithRouter = () => {
  return render(
    <MemoryRouter>
      <Carrito />
    </MemoryRouter>
  );
};

describe("Página del Carrito", () => {
  it("muestra un mensaje cuando el carrito está vacío", () => {
    mockItems = [];
    renderWithRouter();
    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
  });

  it("muestra los productos cuando el carrito tiene items", () => {
    mockItems = [
      { ID: 1, NOMBRE: "Pizza", PRECIO: 10, quantity: 2, CATEGORIA: "Italiana" },
      { ID: 2, NOMBRE: "Burger", PRECIO: 8, quantity: 1, CATEGORIA: "Rápida" },
    ];

    renderWithRouter();

    // Verificar que los productos están en la tabla
    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(screen.getByText("Burger")).toBeInTheDocument();

    // Verificar que el total se muestra correctamente
    // Total = (10 * 2) + (8 * 1) = 28
    expect(screen.getByText(/Total: \$28.00/i)).toBeInTheDocument();
  });

  it("llama a clearCart cuando se presiona 'Vaciar Carrito'", () => {
    mockItems = [{ ID: 1, NOMBRE: "Pizza", PRECIO: 10, quantity: 1 }];
    renderWithRouter();

    const botonVaciar = screen.getByRole("button", { name: /Vaciar Carrito/i });
    fireEvent.click(botonVaciar);

    expect(mockClearCart).toHaveBeenCalledTimes(1);
  });

  it("el botón 'Proceder al Pago' redirige a /checkout", () => {
    mockItems = [{ ID: 1, NOMBRE: "Pizza", PRECIO: 10, quantity: 1 }];
    renderWithRouter();
    const link = screen.getByRole("link", { name: /Proceder al Pago/i });
    expect(link).toHaveAttribute("href", "/checkout");
  });
});