import React from 'react';
import promoVegetariana from '../assets/img/promo_vegetariana.png';
import promoHamburguesa from '../assets/img/hamburguesa-con-guacamole.jpg';
import promoPizzas from '../assets/img/promo_pizzas.png';
// O usa rutas relativas si están en public/: src="static/img/..."

function Carousel_Promos() {
  const irAMenu = (tipo) => {
    window.location.href = `Menu.html?tipo=${tipo}`;
  };

  return (
    <section className="container my-5">
      <h2 className="mb-4 fw-bold">🔥 Promociones Destacadas</h2>
      <div className="row g-4">
        {/* Promo 1 */}
        <div className="col-md-4">
          <div className="card h-100 shadow-sm promo-img-container">
            <img src={promoVegetariana} className="card-img-top" alt="Promo Vegetariana" />
            <div className="card-body text-center">
              <h5 className="card-title">Todas las comidas vegetarianas 20% OFF</h5>
              <p className="card-text text-danger fw-bold">Solo por hoy</p>
              <button className="btn btn-danger" onClick={() => irAMenu('vegetariano')}>
                Ordenar ahora
              </button>
            </div>
          </div>
        </div>

        {/* Promo 2 */}
        <div className="col-md-4">
          <div className="card h-100 shadow-sm promo-img-container">
            <img src={promoHamburguesa} className="card-img-top" alt="Promo Hamburguesa" />
            <div className="card-body text-center">
              <h5 className="card-title">Hamburguesa big-mamma 2x1</h5>
              <p className="card-text text-danger fw-bold">Solo por hoy</p>
              <button className="btn btn-danger" onClick={() => irAMenu('estandar')}>
                Ordenar ahora
              </button>
            </div>
          </div>
        </div>

        {/* Promo 3 */}
        <div className="col-md-4">
          <div className="card h-100 shadow-sm promo-img-container">
            <img src={promoPizzas} className="card-img-top" alt="Envio Gratis Pizzas La Cordillera" />
            <div className="card-body text-center">
              <h5 className="card-title">Envio gratis en Pizzas La Cordillera</h5>
              <p className="card-text text-danger fw-bold">Pedido mínimo $10.000</p>
              <button className="btn btn-danger" onClick={() => irAMenu('restaurantes')}>
                Ordenar ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Carousel_Promos;
