import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import logoSrc from "../assets/img/logo.png"; // Importa el logo
import CartIcon from "../components/CartIcon";

function Navbar() {

  const { autenticado, usuario, logout } = useAuth();
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    clearCart();
    logout();
    navigate("/inicio", { state: { message: "Has cerrado sesión exitosamente." } });
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/menu?q=${searchTerm.trim()}`);
    }
  }

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm === "") {
      navigate("/menu");
    }
  }

  const logoContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '50%',
    padding: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <nav className="navbar navbar-expand-lg bg-danger navbar-dark sticky-top w-100">
      <div className="container">
        {/* Logo + Nombre */}
        <Link className="navbar-brand text-white fw-bold d-flex align-items-center" to="/inicio">
          <div style={logoContainerStyle} className="me-2">
            <img
              src={logoSrc} // Usa la variable importada
              alt="Logo Food Express"
              width="50"
              height="50"
              className="nav-img"
            />
          </div>
          Food Express
        </Link>

        {/* Boton Hamburguesa (para pantallas pequeñas) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido Navbar */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          {/* Links Izquierda */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/inicio">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/menu?tipo=restaurantes">
                Restaurantes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/menu">
                Menú
              </Link>
            </li>
          </ul>

          {/* Barra de búsqueda centrada */}
          <div className="mx-auto search-bar">
            <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-1"
                type="search"
                placeholder="Buscar..."
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="btn btn-outline-light" type="submit">
                Buscar
              </button>
            </form>
          </div>

          {/* Icono del carrito, a la izquierda del botón cuenta */}
          <div className="d-flex align-items-center">
            <CartIcon className="me-2" />
            {/* Dropdown de cuenta (derecha) */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  { autenticado ? usuario?.nombre || "Perfil" : "Cuenta"}
                </a>

                <ul className="dropdown-menu dropdown-menu-end">
                  {!autenticado ? (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/registro">
                          Registro
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/iniciar-sesion">
                          Iniciar sesión
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/perfil">
                          Perfil
                        </Link>
                      </li>
                      <li>
                        <button className="dropdown-item text-danger" onClick={handleLogout}>
                          Cerrar sesion
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
