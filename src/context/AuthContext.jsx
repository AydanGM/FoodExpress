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
    setUsuario(nuevoUsuario);
    localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
  };

  // Función para iniciar sesión
  const login = (correo, password) => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioGuardado && usuarioGuardado.correo === correo && usuarioGuardado.password === password) {
        setUsuario(usuarioGuardado);
        return { exito: true, mensaje: "Inicio de sesión exitoso." };
    } else {
        return { exito: false, mensaje: "Correo o contraseña incorrectos." };
    };
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  const valorContexto = {
    usuario,
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

