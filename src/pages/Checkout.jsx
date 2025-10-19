import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';

function Checkout() {
  // Hooks para obtener el estado del carrito y la navegación
  const { items, getTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Estado para manejar los datos del formulario de pago
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    tarjeta: '',
    expiracion: '',
    cvc: ''
  });
  // Estado para controlar la pantalla de carga mientras se procesa el pago
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  // Definición de costos adicionales para simular un checkout real
  const shippingCost = 750.00; // Costo de envío fijo
  const serviceFee = 200.00;   // Tarifa de servicio fija
  const subtotal = getTotal(); // Subtotal de los productos del carrito
  const totalFinal = subtotal + shippingCost + serviceFee; // Cálculo del total final

  // Manejador para actualizar el estado del formulario a medida que el usuario escribe
  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'expiracion') {
      // Limpia cualquier caracter que no sea un digito
      let formattedValue = value.replace(/\D/g, '');
      // Si el usuario ha escrito más de 2 dígitos, añade la barra "/"
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      
      setFormData({ ...formData, [id]: formattedValue });
    } else if (id === 'tarjeta') {
      // Limpia no-dígitos, añade espacios cada 4 dígitos y limita a 16 dígitos.
      const formattedValue = value.replace(/\D/g, '')
                                  .slice(0, 16)
                                  .replace(/(\d{4})/g, '$1 ').trim();
      setFormData({ ...formData, [id]: formattedValue });
    } else if (id === 'cvc') {
      // Limpia cualquier caracter que no sea un dígito y limita a 4 caracteres
      const formattedValue = value.replace(/\D/g, '').slice(0, 4);
      setFormData({ ...formData, [id]: formattedValue });
    } else {
      setFormData({ ...formData, [id]: value });
    }

  };

  const validateForm = () => {

    const newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";

    if (!formData.direccion.trim()) newErrors.direccion = "La dirección es obligatoria.";

    const cardNumber = formData.tarjeta.replace(/\s/g, '');

    if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.tarjeta = "El número de tarjeta debe tener 16 dígitos.";
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiracion)) {
      newErrors.expiracion = "El formato debe ser MM/AA.";
    } else {
      const [month, year] = formData.expiracion.split('/').map(Number);
      const now = new Date();
      const currentYear = now.getFullYear() % 100; // Obtiene los últimos dos dígitos del año
      const currentMonth = now.getMonth() + 1; // getMonth() es 0-indexado

      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.expiracion = "La tarjeta está vencida.";
      }
    }

    if (!/^\d{3,4}$/.test(formData.cvc.trim())) {
      newErrors.cvc = "El CVC debe tener 3 o 4 dígitos.";
    }

    return newErrors;
  };

  // Manejador para enviar el formulario de pago
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setIsProcessing(true); // Activa la pantalla de carga si no hay errores

    // Se simula un delay de 3 segundos para el procesamiento del pago
    setTimeout(() => {
      alert('¡Pago realizado con éxito! Gracias por tu compra.');
      clearCart(); // Vaciamos el carrito
      navigate('/inicio'); // Redirigimos al inicio
    }, 3000);

  };

  // Si el pago se está procesando, muestra una pantalla de carga
  if (isProcessing) {
    return (
      <div className="container my-5 text-center d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <h2 className="mb-3">Procesando tu pago...</h2>
        <div className="spinner-border text-danger" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="lead mt-3 text-muted">Por favor, espera un momento.</p>
      </div>
    );

  }
  // Si el carrito está vacio, no se puede proceder al pago
  if (items.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h2 className="mb-3">Tu carrito está vacío</h2>
        <p className="lead text-muted">No puedes proceder al pago sin productos.</p>
        <Link to="/menu" className="btn btn-danger mt-3">
          Volver al Menú
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Proceso de Pago</h2>
      <div className="row">
        {/* Columna del Resumen del Pedido */}
        <div className="col-lg-5 order-lg-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-danger">Tu Carrito</span>
            <span className="badge bg-danger rounded-pill">{items.reduce((acc, item) => acc + item.quantity, 0)}</span>
          </h4>
          {/* Lista de productos en el carrito */}
          <ul className="list-group mb-3">
            {items.map(item => (
              <li key={item.ID} className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">{item.NOMBRE}</h6>
                  <small className="text-muted">Cantidad: {item.quantity}</small>
                </div>
                <span className="text-muted">${(item.PRECIO * item.quantity).toFixed(2)}</span>
              </li>
            ))}
            {/* Desglose de costos */}
            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                <h6 className="my-0">Subtotal</h6>
              </div>
              <span className="text-success">${subtotal.toFixed(2)}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Costo de envío</span>
              <strong>${shippingCost.toFixed(2)}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Tarifa de servicio</span>
              <strong>${serviceFee.toFixed(2)}</strong>
            </li>
            {/* Total final */}
            <li className="list-group-item d-flex justify-content-between fs-5">
              <span className="fw-bold">Total (CLP)</span>
              <strong>${totalFinal.toFixed(2)}</strong>
            </li>
          </ul>
        </div>

        {/* Columna del Formulario de Pago */}
        <div className="col-lg-7 order-lg-1">
          <h4 className="mb-3">Dirección de Envío y Pago</h4>
          {/* Formulario de pago */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                <input type="text" className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} id="nombre" value={formData.nombre} onChange={handleChange} required />
                {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
              </div>

              <div className="col-12">
                <label htmlFor="direccion" className="form-label">Dirección de Envío</label>
                <input type="text" className={`form-control ${errors.direccion ? 'is-invalid' : ''}`} id="direccion" placeholder="Calle 123, Comuna" value={formData.direccion} onChange={handleChange} required />
                {errors.direccion && <div className="invalid-feedback">{errors.direccion}</div>}
              </div>
            </div>

            <hr className="my-4" />

            <h4 className="mb-3">Información de Pago</h4>

            <div className="row gy-3">
              <div className="col-md-6">
                <label htmlFor="tarjeta" className="form-label">Número de Tarjeta</label>
                <input type="text" className={`form-control ${errors.tarjeta ? 'is-invalid' : ''}`} id="tarjeta" value={formData.tarjeta} onChange={handleChange} required />
                {errors.tarjeta && <div className="invalid-feedback">{errors.tarjeta}</div>}
              </div>

              <div className="col-md-3">
                <label htmlFor="expiracion" className="form-label">Expiración</label>
                <input type="text" className={`form-control ${errors.expiracion ? 'is-invalid' : ''}`} id="expiracion" placeholder="MM/AA" value={formData.expiracion} onChange={handleChange} required />
                {errors.expiracion && <div className="invalid-feedback">{errors.expiracion}</div>}
              </div>

              <div className="col-md-3">
                <label htmlFor="cvc" className="form-label">CVC</label>
                <input type="text" className={`form-control ${errors.cvc ? 'is-invalid' : ''}`} id="cvc" value={formData.cvc} onChange={handleChange} required />
                {errors.cvc && <div className="invalid-feedback">{errors.cvc}</div>}
              </div>
            </div>

            <hr className="my-4" />

            {/* Botones de acción */}
            <div className="d-grid gap-2">
              <button className="btn btn-success btn-lg" type="submit">Pagar Ahora</button>
              <Link to="/carrito" className="btn btn-outline-danger" role="button">
                Cancelar Orden
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;