import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function Usuarios_reviews() {

    const reviews = [
        { 
            nombre: "Aydan G.",
            texto: '"La comida llegó rapidisimo y estaba deliciosa. ¡Muy recomendable!"',
            estrellas: 5
        },
        {
            nombre: "Marco C.",
            texto: '"Me encanta la variedad de opciones veganas. Siempre encuentro justo lo que quiero."',
            estrellas: 4
        },
        {
            nombre: "Paz V.",
            texto: '"El servicio al cliente fue excepcional. Tuvieron un pequeño error con mi pedido y lo solucionaron rápidamente."',
            estrellas: 5
        }
    ];

    const renderEstrellas = (cantidad) => "⭐".repeat(cantidad);

    return (
        <section className="container my-5">
            <h2 className="text-center mb-4">Lo que dicen nuestros clientes</h2>

            <div className="row justify-content-center">
                {reviews.map((review, index) => (
                    <article className="col-md-3 mb-4" key={index}>
                        <div className="h-100 shadow-sm review-card">
                            <div className="card-body text-center">
                                <p className="mb-2">{review.texto}</p>
                                <div className="star-rating">
                                    {renderEstrellas(review.estrellas)}
                                </div>
                                <h6 className="fw-bold">{review.nombre}</h6>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default Usuarios_reviews;