import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";
import Menu from "./pages/Menu";
import Registro from "./pages/Registro";
import IniciarSesion from "./pages/IniciarSesion";

import './styles/base.css';

function App() {
  return (
    // 1. Envuelve toda tu aplicación con el componente Router
    <Router>
      <Navbar />
      {/* 2. Es buena práctica usar <main> para el contenido principal */}
      <main className="container mt-4">
        <Routes>
          {/* 3. Define la ruta para cada una de tus páginas */}
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} /> {/* Ruta duplicada por si acaso */}
          <Route path="/menu" element={<Menu />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

