import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartIcon({ className = "" }) {
  const { items } = useCart();
  const count = items.reduce((s, i) => s + (i.quantity || 1), 0);

  return (
    <Link
      to="/carrito"
      className={`btn btn-outline-light position-relative ${className}`}
      aria-label="Ver carrito"
    >
      <i className="bi bi-cart" style={{ fontSize: "1.2rem" }} />
      {count > 0 && (
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          style={{ fontSize: 12 }}
        >
          {count}
        </span>
      )}
    </Link>
  );
}