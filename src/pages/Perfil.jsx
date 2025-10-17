import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom";
import "../styles/perfil.css"

function Perfil() {

  const { usuario } = useAuth();

  // Si no hay usuario autenticado 
  if (!usuario) {
    return(
      <main className="container my-5 text-center">
        <div className="alert alert-warning shadow-sm" role="alert">
          <h4 className="alert-heading mb-2">No has iniciado sesión</h4>
          <p>Por favor inicia sesión para ver tu perfil.</p>
          {/* Enlace a iniciar sesión */}
          <p className="mt-3">
            <Link to="/iniciar-sesion"> Iniciar sesión</Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="container-perfil my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card-perfil shadow p-4 border-0">
            <h2 className="text-center mb-4 fw-bold text-danger">Mi perfil</h2>

            {/* Información del usuario */}
            <div className="text-center mb-4">
              <img 
                src="./src/assets/img/foto_perfil.png" 
                alt="Foto de perfil" 
                className="rounded-circle mb-3 shadow-sm"
                width="150"
                height="150"
              />
              <h4 className="fw-semibold">{usuario.nombre}</h4>
              <p className="text-muted">{usuario.correo}</p>
            </div>

            <div className="text-center">
              <button className="btn btn-outline-danger">
                <i className="bi bi-pencil-square me-2"></i> Editar perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Perfil;