import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast, Zoom } from 'react-toastify';

import { consultarApi } from '../services/fetchApi';
import { useUser } from '../hooks/useUser'
import { consultarPersonajesFavoritos, consultarDeletePersonajeFavorito, consultarAddPersonajeFavorito } from '../services/fetchApiPersonajes';

export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {

    const [producto, setProducto] = useState([]);
    const [personajesFavoritos, setPersonajesFavoritos] = useState([]);
    const [page, setPage] = useState(1);
    const [pageFinalPersonajes, setPageFinalPersonajes] = useState(1);
    const { isAutenticado } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        const obtenerPersonajes = async () => {
            try {
                const data = await consultarApi(page);
                setProducto(data.results);
                setPageFinalPersonajes(data.info.pages)
            }catch(error) {
                console.error('Error al obtener el personaje: ', error);
                throw error;
            };
        };

        obtenerPersonajes();
    }, [page]);

    useEffect(() => {
        const obtenerPersonajesFavoritos = async () => {
            if (isAutenticado) {
                try {
                    const favoritos = await consultarPersonajesFavoritos()
                    setPersonajesFavoritos(favoritos.personaje_favorite)
                } catch (error) {
                    console.error('Error al obtener los personajes favoritos: ', error);
                    throw error;
                }
            }
        }

        obtenerPersonajesFavoritos()
    }, [isAutenticado])

    const handlePaginaSiguiente = () => {
        setPage(page + 1);
    };

    const handlePaginaAnterior = () => {
        if (page > 1) {
            setPage(page - 1)
        };
    };

    const handlePaginaInicio = () => {
        setPage(1);
    };

    const handleAgregarFavorito = async (id) => {
        if (!isAutenticado) {
            navigate('/iniciosesion')
            toast.error('Debes iniciar sesion', {
                position: "bottom-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom
            });
            return
        }

        const personajeFavorito = producto.find((p) => p.id === id);
        const pIsFavorito = personajeIsFavorito(id);
        const personajeBackend = { personaje_id: personajeFavorito.id, personaje_name: personajeFavorito.name, image: personajeFavorito.image }

        try {
            if (pIsFavorito) {
                await consultarDeletePersonajeFavorito(id)
                const personajesEliminarFavorito = personajesFavoritos.filter((p) => p.id !== id);
                setPersonajesFavoritos(personajesEliminarFavorito);
            } else if (personajeFavorito) {
                await consultarAddPersonajeFavorito(personajeBackend)
                setPersonajesFavoritos([...personajesFavoritos, personajeFavorito]);
            };
        } catch (error) {
            console.error('Error al agregar/eliminar un personaje favorito: ', error);
            throw error;
        }
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
            pageFinalPersonajes,
            setPersonajesFavoritos
            }}
        >
            {children};
        </ProductosContext.Provider>
    );
};
