import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from "../context/CartContext";
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export default function Menu() {
  const[items, setItems] = useState([]);
  const[titulo, setTitulo] = useState('Comidas')
  const[subtitulo, setSubtitulo] = useState('Selecciona la comida que gustes!!')
  const[loading, setLoading] = useState(true)
  const[error, setError] = useState(null)
  const { addToCart } = useCart();
  const { autenticado } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  // usar el hook de react-router para obtener la query string reactiva
  const location = useLocation();

  useEffect(() =>{
    const seleccion = new URLSearchParams(location.search);
    const tipoSeleccionado = seleccion.get("tipo");
    const busqueda = seleccion.get("q");
        
    const fetchData = async () => {
      try {
        setLoading(true);
        const API_URL_BASE = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3001/api';

        let url = `${API_URL_BASE}/productos`;
        let tipoElemento = 'comida';

        if (tipoSeleccionado?.toLowerCase() === 'restaurantes'){
          url = `${API_URL_BASE}/restaurantes`;
          tipoElemento = 'restaurant';
          setTitulo('Restaurantes');
          setSubtitulo('Restaurantes disponibles!!')
        } else {
          setTitulo('Comidas');
          setSubtitulo('Selecciona la comida que gustes!!')
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Error al conectar con el Servidor')
        }
        let data = await response.json();
        data = data.map(item => ({ ...item, tipoElemento}));

        if (tipoSeleccionado && tipoSeleccionado.toLowerCase() !== 'restaurantes'){
          data = data.filter(c => c.CATEGORIA?.toLowerCase() === tipoSeleccionado.toLowerCase());
        }

        if (busqueda) {
          data = data.filter(item => item.NOMBRE.toLowerCase().includes(busqueda.toLowerCase()));
          setTitulo(`Resultados para "${busqueda}"`);
        }

        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally{
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search]); //dependemos de location.search para re-ejecutar al cambiar query

  const handleAddToCart = (item) => {
    if (autenticado) {
      addToCart(item);
      showNotification("¡Añadido al carrito de compras!");
    } else {
      navigate('/iniciar-sesion');
    }
  };

  if (loading) return <p className="text-center my-5">Cargando menú...</p>;
  if (error) return <p className="text-center text-danger my-5">Error: {error}</p>;
  
  return (
        <main>
            <div className="container text-center my-5">
                <h1 className="mb-4">{titulo}</h1>
                <p className="lead mb-4">{subtitulo}</p>
            </div>
            <div className="container my-5">
                <div className="row">
                    {items.length === 0 ? (
                        <p className='text-center'>No hay elementos disponibles.</p>
                    ) : (
                        items.map((item) => (
                            <div key={item.ID} className="col-md-4 mb-4">
                                <div className="card h-100 shadow-sm">
                                    {item.tipoElemento === "comida" ? (
                                        <>
                                          <img src={item.IMAGEN_URL || "/assets/img/default.png"} className="card-img-top" alt={item.NOMBRE} />
                                          <div className="card-body text-center d-flex flex-column">
                                              <h5 className="card-title">{item.NOMBRE}</h5>
                                              <p className="card-text text-capitalize text-muted">{item.CATEGORIA} - ${item.PRECIO}</p>
                                              <button className="btn btn-danger mt-auto" onClick={() => handleAddToCart(item)}>
                                                Añadir al carrito
                                              </button>
                                          </div>
                                        </>
                                    ) : (
                                        <div className="card-body text-center d-flex flex-column justify-content-center">
                                            <h5 className="card-title">{item.NOMBRE}</h5>
                                            <p className="card-text">{item.DIRECCION}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );

}