import React, { createContext, useState, useContext, useCallback } from 'react';

// Se crea un objeto de contexto que los componentes podrán usar para suscribirse a los cambios
const NotificationContext = createContext();


// Este componente envolverá a otros componentes y les dará acceso al contexto
export function NotificationProvider({ children }) {
  // Estado para almacenar el mensaje de la notificación actual. `null` si no hay ninguna
  const [notification, setNotification] = useState(null);

  // `useCallback` memoriza la función para que no se vuelva a crear en cada render, mejorando el rendimiento
  const showNotification = useCallback((message) => {
    setNotification(message); // Muestra la notificación estableciendo el mensaje
    
    // Se usa un temporizador para ocultar la notificación automáticamente después de 3 segundos
    setTimeout(() => {
      setNotification(null); // Limpia el mensaje, lo que hara que el componente Notification se oculte
    }, 3000);
  }, []); // El array de dependencias vacio `[]` significa que la función nunca cambiara

  return (
    // El Provider expone el estado `notification` y la función `showNotification` a todos sus hijos
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

// Facilita el uso del contexto. En lugar de `useContext(NotificationContext)`, los componentes pueden simplemente llamar a `useNotification()`
export const useNotification = () => useContext(NotificationContext);