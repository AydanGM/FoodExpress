import Carousel_Inicio from "../components/Carousel_Inicio";
import Carousel_Promos from "../components/Carousel_Promos";
import Usuarios_reviews from "../components/Usuarios_reviews";
import "../styles/inicio.css"


export default function Inicio() {
  return (
    <div className="container text-center my-5">
      <h1>Bienvenido a Food Express</h1>
      <p>Tu plataforma de entrega de comida rápida favorita.</p>
      <Carousel_Inicio />
      <Carousel_Promos />
      <Usuarios_reviews />
    </div>

  )
}
