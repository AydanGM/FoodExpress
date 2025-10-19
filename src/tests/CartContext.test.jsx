import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, describe, it, expect, test } from "vitest";
import { CartProvider, useCart } from "../context/CartContext";

afterEach(() => {
  cleanup();
  localStorage.clear();
});

const product1 = { ID: 1, NOMBRE: "Pizza", PRECIO: 10 };
const product2 = { ID: 2, NOMBRE: "Burger", PRECIO: 8 };

// Componente de prueba para interactuar con el contexto
function CartTestComponent() {
  const { items, addToCart, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();

  return (
    <div>
      <div data-testid="total">${getTotal()}</div>
      <div data-testid="items-count">{items.length}</div>
      <div data-testid="item-1-quantity">{items.find(i => i.ID === 1)?.quantity || 0}</div>

      <button onClick={() => addToCart(product1)}>Add Pizza</button>
      <button onClick={() => addToCart(product2)}>Add Burger</button>
      <button onClick={() => removeFromCart(1)}>Remove Pizza</button>
      <button onClick={() => updateQuantity(1, 5)}>Update Pizza to 5</button>
      <button onClick={() => updateQuantity(1, 0)}>Update Pizza to 0</button>
      <button onClick={() => clearCart()}>Clear Cart</button>
    </div>
  );
}

const renderWithProvider = () => {
  return render(
    <CartProvider>
      <CartTestComponent />
    </CartProvider>
  );
};

describe("CartContext", () => {
  it("debe iniciar con el carrito vacío", () => {
    renderWithProvider();
    expect(screen.getByTestId("items-count").textContent).toBe("0");
    expect(screen.getByTestId("total").textContent).toBe("$0");
  });

  it("debe añadir un producto al carrito", () => {
    renderWithProvider();
    fireEvent.click(screen.getByText("Add Pizza"));
    expect(screen.getByTestId("items-count").textContent).toBe("1");
    expect(screen.getByTestId("item-1-quantity").textContent).toBe("1");
    expect(screen.getByTestId("total").textContent).toBe("$10");
  });

  it("debe incrementar la cantidad si el producto ya existe", () => {
    renderWithProvider();
    fireEvent.click(screen.getByText("Add Pizza"));
    fireEvent.click(screen.getByText("Add Pizza")); // Add again
    expect(screen.getByTestId("items-count").textContent).toBe("1");
    expect(screen.getByTestId("item-1-quantity").textContent).toBe("2");
    expect(screen.getByTestId("total").textContent).toBe("$20");
  });

  it("debe eliminar un producto del carrito", () => {
    renderWithProvider();
    fireEvent.click(screen.getByText("Add Pizza"));
    expect(screen.getByTestId("items-count").textContent).toBe("1");
    fireEvent.click(screen.getByText("Remove Pizza"));
    expect(screen.getByTestId("items-count").textContent).toBe("0");
  });

  it("debe actualizar la cantidad de un producto", () => {
    renderWithProvider();
    fireEvent.click(screen.getByText("Add Pizza"));
    fireEvent.click(screen.getByText("Update Pizza to 5"));
    expect(screen.getByTestId("item-1-quantity").textContent).toBe("5");
    expect(screen.getByTestId("total").textContent).toBe("$50");
  });

  it("debe eliminar un producto si la cantidad se actualiza a 0", () => {
    renderWithProvider();
    fireEvent.click(screen.getByText("Add Pizza"));
    fireEvent.click(screen.getByText("Update Pizza to 0"));
    expect(screen.getByTestId("items-count").textContent).toBe("0");
  });

  it("debe vaciar el carrito", () => {
    renderWithProvider();
    fireEvent.click(screen.getByText("Add Pizza"));
    fireEvent.click(screen.getByText("Add Burger"));
    expect(screen.getByTestId("items-count").textContent).toBe("2");
    fireEvent.click(screen.getByText("Clear Cart"));
    expect(screen.getByTestId("items-count").textContent).toBe("0");
    expect(screen.getByTestId("total").textContent).toBe("$0");
  });

  it("debe persistir y cargar el estado desde localStorage", () => {
    // Primero, renderizamos y añadimos un item para guardarlo en localStorage
    const { unmount } = renderWithProvider();
    fireEvent.click(screen.getByText("Add Pizza"));
    unmount(); // Desmontamos para simular un refresco de página

    // Volvemos a renderizar, debería cargar el estado desde localStorage
    renderWithProvider();
    expect(screen.getByTestId("items-count").textContent).toBe("1");
    expect(screen.getByTestId("item-1-quantity").textContent).toBe("1");
    expect(screen.getByTestId("total").textContent).toBe("$10");
  });
});