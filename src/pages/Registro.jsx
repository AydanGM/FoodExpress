import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/formularios.css"

function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmPassword: ""
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const validarFormulario = () => {
    let nuevosErrores = {};

    if (!form.nombre.trim())  nuevosErrores.nombre = "El nombre es obligatorio."; 
    if (!form.correo.includes("@")) nuevosErrores.correo = "El correo es obligatorio.";
    if (form.password.length < 6) nuevosErrores.password = "La contraseña debe tener al menos 6 caracteres.";
    if (form.password !== form.confirmPassword) nuevosErrores.confirmPassword = "Las contraseñas no coinciden.";

    setError(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      setMensaje("Registro exitoso. ¡Bienvenido a FoodExpress!");
      setError({});

      console.log("Datos del formulario:", form);
      setForm({ nombre: "", correo: "", password: "", confirmPassword: "" });      
    } else {
      setMensaje("Por favor corrige los errores en el formulario y vuelve a intentarlo.");
    }
  };

  return(
    <div className="registro-page d-flex justify-content-center align-items-center">
      <main className="form-container p-4 shadow-sm rounded">
        <h2 className="text-center mb-4 fw-bold">Crear cuenta</h2>
        {/* Formulario */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Nombre */}
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre completo
            </label>
            <input
              type="text"
              id="nombre"
              className={`form-control ${error.nombre ? "is-invalid" : ""}`}
              placeholder="Ingresa tu nombre y apellido"
              value={form.nombre}
              onChange={handleChange}
              required
            />
            {error.nombre && (
              <div className="invalid-feedback">
                {error.nombre}
              </div>
            )}
          </div>

          {/* Correo */}
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">
              Correo electrónico
            </label>
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
              placeholder="Ingresa una contraseña"
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

          {/* Confirmar Contraseña */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={`form-control ${error.confirmPassword ? "is-invalid" : ""}`}
              placeholder="Confirma tu contraseña"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            {error.confirmPassword && (
              <div className="invalid-feedback">
                {error.confirmPassword}
              </div>
            )}
          </div>

          {/* Botón de envío */}
            <button type="submit" className="btn btn-danger w-100 py-2 fw-semi-bold shadow-sm">
              Registrarse
            </button>
        </form>

        {/* Mensaje de éxito o error */}
        {mensaje && (
          <div 
            className={`alert ${Object.keys(error).length === 0 ? "alert-success" : "alert-danger"
            }`}
            role="alert">
            {mensaje}
          </div>
        )}

        {/* Enlace a iniciar sesión */}
        <p className="mt-3">
          ¿Ya tienes una cuenta? <Link to="/iniciar-sesion"> Iniciar sesión</Link>
        </p>
      </main>
    </div>
  )
}

export default Registro;