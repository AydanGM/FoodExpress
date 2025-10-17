import "../styles/nosotros.css"

function Nosotros() {
  return (
    <main className="container-nosotros my-5">
      <section className="text-center mb-5">
        <h2 className="fw-bold text-danger mb-3">Sobre Food Express</h2>
        <p className="text-muted bg-nosotros-light">
          En <strong>Food Express</strong> creemos que pedir tu comida favorita debe ser rápido, cómodo y confiable.
          Nuestro objetivo es conectar a los mejores restaurantes con los usuarios que buscan calidad,
          sabor y comidas que se acomoden a ellos, sin importar dónde estén.
        </p>
      </section>
      
      <section className="row align-items-center mb-5">
        <div className="col-md-6 mb-4 mb-md-0">
          <img 
            src="./src/assets/img/delivery.png" 
            alt="Imagen Nosotros" 
            className="img-fluid rounded shadow img-nosotros"
          />
        </div>

        <div className="col-md-6">
          <h4 className="fw-semibold text-danger">Nuestra misión</h4>
          <p className="text-muted bg-nosotros-light"> 
            Facilitar el acceso a una amplia variedad de alimentos y dietas
            específicas ya sean vegetarianas, veganas o sin gluten promoviendo
            una alimentación equilibrada y accesible para todos.
          </p>
          <h4 className="fw-semibold text-danger mt-4">Nuestros valores</h4>
          <ul className="text-muted bg-nosotros-light">
            <li>Rapidez en las entregas</li>
            <li>Compromiso con la calidad</li>
            <li>Variedad gastronómica</li>
            <li>Respeto por el medio ambiente</li>
          </ul>
        </div>
      </section>

      <section className="bg-nosotros-light p-4 rounded shadow-sm text-center">
        <h4 className="fw-bold text-danger mb-3">¿Por qué elegirnos?</h4>
        <p className="text-muted mb-0">
          Porque en <strong>Food Express</strong> nos preocupamos por ofrecerte
          lo mejor de cada restaurante, con opciones adaptadas a tu estilo de vida.
          Tu satisfacción y bienestar son nuestra prioridad.
        </p>
      </section>
    </main>
  );
}

export default Nosotros;