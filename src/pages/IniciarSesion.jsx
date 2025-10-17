import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/formularios.css"

function IniciarSesion() {

  const [form, setForm] = useState({
    correo: "",
    password: ""
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  const validarFormulario = () => {
    let errores = {};
    if (!form.correo.trim()) errores.correo = "El correo es obligatorio.";
    if (!form.password.trim()) errores.password = "La contraseña es obligatoria.";

    setError(errores);
    return Object.keys(errores).length === 0;
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      const resultado = login(form.correo, form.password);

      if (resultado.exito) {
        setMensaje(resultado.mensaje);
        setError({});
        setTimeout(() => {
          navigate("/")
        }, 2000);
      } else {
        setMensaje(resultado.mensaje);
      }
    } else {
      setMensaje("Por favor corrige los errores en el formulario y vuelve a intentarlo.");
    }
  };

  return (
    <div className="registro-page d-flex justify-content-center align-items-center form-container-login">
      <main className="form-container p-4 shadow-sm rounded">
        <h2 className="text-center mb-4 fw-bold">Iniciar Sesión</h2>
        {/* Formulario */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Correo */}
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              className={`form-control ${error.correo ? "is-invalid" : ""}`}
              placeholder="ejemplo@correo.com"
              value={form.correo}
              onChange={handleChange}
              required
            />
            {error.correo && (
              <div className="invalid-feedback">
                {error.correo}
              </div>
            )}
          </div>

          {/* Contraseña */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className={`form-control ${error.password ? "is-invalid" : ""}`}
              placeholder="Ingresa tu contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />
            {error.password && (
            <div className="invalid-feedback">
              {error.password}
            </div>
            )}
          </div>

          {/* Botón de envío */}
          <button type="submit" className="btn btn-danger w-100 py-2 fw-semi-bold shadow-sm">
            Iniciar Sesión
          </button>
        </form>

        {/* Mensaje */}
        {mensaje && (
          <div 
            className={`alert ${Object.keys(error).length === 0 ? 'alert-info' : 'alert-danger'
            }`} 
            role="alert"
          >
            {mensaje}
          </div>
        )}

        {/* Enlace a registro */}
        <p className="text-center mt-3">
          ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </main>
    </div>
  );
}

export default IniciarSesion;