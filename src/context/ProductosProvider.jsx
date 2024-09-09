import { createContext, useEffect, useState } from 'react';
import { consultarApi } from '../services/fetchApi';

export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {

    const [producto, setProducto] = useState([]);
    const [personajesFavoritos, setPersonajesFavoritos] = useState([]);
    const [page, setPage] = useState(1);

    const handlePaginaSiguiente = () => {
        setPage(page + 1);
    }

    const handlePaginaAnterior = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const handlePaginaInicio = () => {
        setPage(1);
    }

    useEffect(() => {
        const obtenerPersonajes = async () => {
            try {
                const results = await consultarApi(page);
                setProducto(results);
            }catch(error) {
                console.error('Error al obtener el personaje: ', error);
                throw error;
            };
        };

        obtenerPersonajes();
    }, [page]);

    const handleAgregarFavorito = (id) => {
        const personajeFavorito = producto.find((p) => p.id === id);

        const personajeIsFavorito = personajesFavoritos.some((p) => p.id === id);

        if (personajeIsFavorito) {
            const personajesEliminarFavorito = personajesFavoritos.filter((p) => p.id !== id);
            setPersonajesFavoritos(personajesEliminarFavorito);
        } else if (personajeFavorito){
            setPersonajesFavoritos([...personajesFavoritos, personajeFavorito]);
        };
    };

    const personajeIsFavorito = (id) => {
        const favorito = personajesFavoritos.some((p) => p.id === id);
        return favorito;
    }

    return (
        <ProductosContext.Provider value={{ 
            producto, 
            page, 
            setPage, 
            handlePaginaSiguiente, 
            handlePaginaInicio, 
            handlePaginaAnterior,
            handleAgregarFavorito,
            personajesFavoritos,
            personajeIsFavorito,
            }}
        >
            {children};
        </ProductosContext.Provider>
    );
};
