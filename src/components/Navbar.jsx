import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-danger navbar-dark sticky-top w-100">
      <div className="container-fluid">
        {/* Logo + Nombre */}
        <Link className="navbar-brand text-white fw-bold d-flex align-items-center" to="/inicio">
          <img
            src="/src/assets/img/logo.png"
            alt="Logo Food Express"
            width="50"
            height="50"
            className="me-2"
          />
          Food Express
        </Link>

        {/* Botón Hamburguesa (para pantallas pequeñas) */}
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
            <form className="d-flex" role="search">
              <input
                className="form-control me-1"
                type="search"
                placeholder="Buscar..."
                aria-label="Search"
              />
              <button className="btn btn-outline-light" type="submit">
                Buscar
              </button>
            </form>
          </div>

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
                Cuenta
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
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
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Cerrar sesión
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
