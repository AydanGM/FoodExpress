import { createContext, useState, useContext, useEffect } from "react";

// Crea el contexto de autenticación
const AuthContext = createContext();

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Verifica si hay un usuario guardado en el almacenamiento local al cargar la aplicación
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  // Función para registrar un nuevo usuario
  const registro = (nuevoUsuario) => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    setUsuario(nuevoUsuario);
  };

  // Función para iniciar sesión
  const login = (correo, password) => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuarios.find(u => u.correo === correo && u.password === password);
    if (usuarioEncontrado) {
        setUsuario(usuarioEncontrado);
        return { exito: true, mensaje: "Inicio de sesión exitoso." };
    } else {
        return { exito: false, mensaje: "Correo o contraseña incorrectos." };
    };
  };

  // Función para cerrar sesión
  const logout = () => {
    setUsuario(null);
  };

  const autenticado = !!usuario;

  // Valor del contexto que se proporcionará a los componentes hijos
  const valorContexto = {
    usuario,
    autenticado,
    registro,
    login,
    logout
  };
  return (
    <AuthContext.Provider value={valorContexto}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);