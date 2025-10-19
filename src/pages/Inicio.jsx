import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Carousel_Inicio from "../components/Carousel_Inicio";
import Carousel_Promos from "../components/Carousel_Promos";
import Usuarios_reviews from "../components/Usuarios_reviews";
import { useNotification } from '../context/NotificationContext';
import "../styles/inicio.css"


export default function Inicio() {
  const location = useLocation();
  const { showNotification } = useNotification();

  useEffect(() => {
    if (location.state?.message) {
      showNotification(location.state.message);
    }
  }, [location, showNotification]);

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
