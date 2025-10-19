import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const s = localStorage.getItem("cart");
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  const addToCart = (product) => {
    setItems((curr) => {
      const exists = curr.find((i) => i.ID === product.ID);
      if (exists) {
        return curr.map((i) =>
          i.ID === product.ID ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...curr, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) =>
    setItems((curr) => curr.filter((i) => i.ID !== productId));

  const updateQuantity = (productId, quantity) => {
    setItems((curr) =>
      curr
        .map((i) => (i.ID === productId ? { ...i, quantity: Math.max(0, quantity) } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);

  const getTotal = () =>
    items.reduce((sum, i) => sum + (Number(i.PRECIO || 0) * (i.quantity || 0)), 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, getTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);