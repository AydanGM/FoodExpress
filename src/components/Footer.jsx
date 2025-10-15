import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-custom bg-dark text-white py-3 mt-auto">
      <div className="container px-5">
        <div className="row align-items-center">

          {/* Primera columna */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Food Express</h5>
            <p className="mb-0">Tu plataforma favorita de comida rápida a domicilio.</p>
          </div>

          {/* Segunda columna */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Enlaces rápidos</h6>
            <ul className="list-unstyled mb-0">
              <li><Link to="/inicio" className="text-light text-decoration-none">Inicio</Link></li>
              <li><Link to="/menu" className="text-light text-decoration-none">Menú</Link></li>
              <li><Link to="/perfil" className="text-light text-decoration-none">Perfil</Link></li>
              <li><Link to="/ayuda" className="text-light text-decoration-none">Ayuda</Link></li>
              <li><Link to="/nosotros" className="text-light text-decoration-none">Nosotros</Link></li>
            </ul>
          </div>

          {/* Tercera columna */}
          <div className="col-md-4 mb-3 text-md-end">
            <h6 className="fw-bold">Síguenos</h6>
            <div className="d-flex justify-content-start justify-content-md-end gap-3 mt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white" aria-label="Facebook">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white" aria-label="Instagram">
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white" aria-label="Twitter">
                <i className="bi bi-twitter fs-4"></i>
              </a>
            </div>
          </div>

        </div>

        <hr className="bg-light" />

        <div className="text-center pb-1">
          <small>&copy; {new Date().getFullYear()} Food Express. Todos los derechos reservados.</small>
        </div>
      </div>
    </footer>
  );
}