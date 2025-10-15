import React from 'react';
import Carousel  from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import img1 from '../assets/img/Chuleta.png'; 
import img2 from '../assets/img/comida_vegana.png';
import img3 from '../assets/img/comida_vegetariana.png';
import img4 from '../assets/img/comida_pescetariana.png';
import img5 from '../assets/img/sin-gluten.png';
import img6 from '../assets/img/dieta_keto.png';
import img7 from '../assets/img/comidas_halal.png';
import img8 from '../assets/img/comida_sin_lactosa.png';

function Carousel_Inicio() {

    const responsive = {
        dektop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1,
        },
    };
    
    const items = [
        {
            img: img1,
            titulo: "Comidas Tradicionales",
            texto: "Investiga sobre restaurantes y comidas varias si no tienes una preferencia de dieta."
        },
        {
            img: img2,
            titulo: "Comidas Veganas",
            texto: "¿Quieres alimentos de origen vegetal? Aquí tienes una variedad de opciones veganas."
        },
        {
            img: img3,
            titulo: "Comidas Vegetarianas",
            texto: "Explora deliciosas opciones vegetarianas que satisfacen tu paladar."
        },
        {
            img: img4,
            titulo: "Comidas Pescetarianas",
            texto: "Si eres pescetariano, aquí encontrarás platos que incluyen pescado y mariscos."
        },
        {
            img: img5,
            titulo: "Comidas Sin Gluten",
            texto: "Descubre opciones sin gluten para una alimentación saludable y segura."
        },
        {
            img: img6,
            titulo: "Dieta Keto",
            texto: "Explora platos bajos en carbohidratos y altos en grasas para una dieta cetogénica."
        },
        {
            img: img7,
            titulo: "Dieta Halal",
            texto: "Encuentra comidas que cumplen con los requisitos de la dieta halal."
        },
        {
            img: img8,
            titulo: "Comidas Sin Lactosa",
            texto: "Explora opciones de alimentos que son libres de lactosa."
        }
    ];

    return (
        <div className="container my-5">
            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3500}
                keyBoardControl={true}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                containerClass="carousel-container"
                itemClass="carousel-item-padding-40-px"
            >
                {items.map((item, index) => (
                    <div key={index} className="text-center px-3">
                        <div className="carousel-card">
                            <img 
                                src={item.img} 
                                alt={item.titulo} 
                                className="img-fluid rounded shadow-sm"
                                style={{
                                    width: '100%',
                                    height: '250px',
                                    objectFit: 'cover',
                                    marginBottom: '15px'
                                }}
                            />
                            <h5 className="fw-bold">{item.titulo}</h5>
                            <p style={{ fontSize: "14px", color: "#555" }}>{item.texto}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    )


}
export default Carousel_Inicio;