import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { NotificationProvider, useNotification } from "./context/NotificationContext";
import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";
import Menu from "./pages/Menu";
import Registro from "./pages/Registro";
import IniciarSesion from "./pages/IniciarSesion";
import Footer from "./components/Footer";
import Perfil from "./pages/Perfil"
import Nosotros from "./pages/Nosotros";
import Ayuda from "./pages/Ayuda"
import Checkout from "./pages/Checkout";
import Carrito from "./pages/Carrito";
import CartIcon from "./components/CartIcon";
import Notification from "./components/Notification";

import './styles/base.css';

function AppContent() {
  const { notification } = useNotification();

  return (
    <>
      <Notification message={notification} />
      <Navbar />
      <main className="container mt-4">
        <Routes>
          {/* Define la ruta para cada una de tus páginas */}
          <Route path="*" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/ayuda" element={<Ayuda />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
