import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Carrito() {
  // Obtiene las funciones y el estado del carrito desde el CartContext
  const { items, removeFromCart, updateQuantity, clearCart, getTotal } =
    useCart();

  // Si no hay items en el carrito, muestra un mensaje indicandolo.
  if (!items || items.length === 0) {
    return (
      <div className="container text-center my-5">
        <h2>Tu carrito está vacío</h2>
      </div>
    );
  }

  // Si hay items, renderiza la tabla con los productos.
  return (
    <div className="container my-5">
      <h2 className="mb-4">Tu Carrito</h2>
      <div className="table-responsive">
        <table className="table align-middle">
          {/* Cabecera de la tabla */}
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th style={{ width: 160 }}>Cantidad</th>
              <th>Subtotal</th>
              <th />
            </tr>
          </thead>
          {/* Cuerpo de la tabla, donde se mapean los productos */}
          <tbody>
            {items.map((item) => (
              <tr key={item.ID}>
                {/* Columna del producto (imagen y nombre) */}
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={item.IMAGEN_URL || "/assets/img/default.png"}
                      alt={item.NOMBRE}
                      style={{ width: 64, height: 64, objectFit: "cover" }}
                      className="me-3 rounded"
                    />
                    <div>
                      <div className="fw-semibold">{item.NOMBRE}</div>
                      <div className="text-muted small">{item.CATEGORIA}</div>
                    </div>
                  </div>
                </td>
                {/* Columna del precio unitario */}
                <td>${Number(item.PRECIO).toFixed(2)}</td>
                <td>
                  {/* Columna para controlar la cantidad */}
                  <div className="input-group" style={{ maxWidth: 140 }}>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => updateQuantity(item.ID, (item.quantity || 1) - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="form-control text-center"
                      value={item.quantity || 1}
                      onChange={(e) => updateQuantity(item.ID, parseInt(e.target.value || "1"))}
                      min="1"
                    />
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => updateQuantity(item.ID, (item.quantity || 1) + 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                {/* Columna del subtotal por producto */}
                <td>${((item.quantity || 1) * Number(item.PRECIO || 0)).toFixed(2)}</td>
                <td>
                  {/* Columna para el botón de eliminar */}
                  <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.ID)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Seccion de acciones y total */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button className="btn btn-outline-danger" onClick={clearCart}>
          Vaciar Carrito
        </button>
        <div className="text-end">
          <h4>Total: ${getTotal().toFixed(2)}</h4>
          <Link to="/checkout" className="btn btn-success">
            Proceder al Pago
          </Link>
        </div>
      </div>
    </div>
  );
}