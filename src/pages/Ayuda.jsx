import { useState } from "react";
import "../styles/ayuda.css"

function Ayuda() {

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [resultado, setResultado] = useState("");

    const enviarContacto = (e) => {
        e.preventDefault();

        // Validaciones
        if(nombre.trim().length < 10) {
            setResultado({
                texto: "Por favor ingresa un nombre válido.",
                clase: "text-danger" 
            });
            return;
        }

        const correoRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!correoRe.test(correo.trim())) {
            setResultado ({
                texto: "Correo inválido.", 
                clase: "text-danger"
            });
            return;
        }

        if(mensaje.trim().length < 15) {
            setResultado({
                texto: "El mensaje es demasiado corto.",
                clase: "text-danger"
            });
            return;
        }

        // En caso de exito
        setResultado({
            texto: "Mensaje enviado correctamente ✅",
            clase: "text-success"
        })

        // Reset de variables
        setTimeout(() => {
            setNombre("");
            setCorreo("");
            setMensaje("");
            setResultado({
                texto: "",
                clase: ""
            });
        }, 2000);
    };

    return(
        <main className="container-ayuda d-flex justify-content-center align-items-center py-5">
            <div className="card-ayuda shadow p-4 col-md-6 border-0">
                <h2 className="text-center mb-4 fw-bold text-danger">Contáctanos</h2>

                <form onSubmit={enviarContacto} noValidate>
                    <div className="mb-3">
                        <label htmlFor="nombreContacto" className="form-label">
                            Nombre
                        </label>
                        <input 
                            className="form-control"
                            type="text" 
                            id="nombreContacto"
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="nombreContacto" className="form-label">
                            Correo
                        </label>
                        <input 
                            className="form-control"
                            type="email" 
                            id="correoContacto"
                            placeholder="ejemplo@correo.com"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                        />
                    </div>


                    <div className="mb-3">
                        <label htmlFor="nombreContacto" className="form-label">
                            Mensaje
                        </label>
                        <textarea
                            className="form-control"
                            id="mensajeContacto"
                            rows="3"
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-danger w-100">
                        Enviar
                    </button>
                </form>

                {resultado.texto && (
                    <div className={`mt-3 text-center ${resultado.clase}`}>{resultado.texto}</div>
                )}
            </div>
        </main>
    )
}


export default Ayuda;