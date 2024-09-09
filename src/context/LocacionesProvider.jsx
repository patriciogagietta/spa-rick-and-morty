import { createContext, useEffect, useState } from "react";
import { consultarApiLocation } from "../services/fetchApi";

export const LocacionesContext = createContext();

export const LocacionesProvider = ({ children }) => {

    const [locaciones, setLocaciones] = useState([]);
    const [pageLocacion, setPageLocacion] = useState(1);
    const [pageFinalLocacion, setPageFinalLocacion] = useState(1);
    const [locacionesFavoritas, setLocacionesFavoritas] = useState([]);

    useEffect(() => {
        const obtenerLocaiones = async () => {
            try{
                const data = await consultarApiLocation(pageLocacion);
                setLocaciones(data.results);
                setPageFinalLocacion(data.info.pages);
            }catch(error){
                console.error("Error al obtener las locaiones: " ,error);
                throw error;
            };
        };

        obtenerLocaiones();
    }, [pageLocacion]);

    const handlePaginaSiguienteLocacion = () => {
        if (pageLocacion < pageFinalLocacion){
            setPageLocacion(pageLocacion + 1);
        }
    };

    const handlePaginaAnteriorLocacion = () => {
        if (pageLocacion > 1){
            setPageLocacion(pageLocacion - 1);
        };
    };

    const handlePaginaIcicialLocacion = () => {
        setPageLocacion(1);
    };

    const handleAgregarLocacionesFavoritas = (id) => {
        const locacionFavorita = locaciones.find((l) => l.id === id);

        const lIsFavorita = locacionIsFavorita(id);

        if (lIsFavorita) {
            const eliminarLocacionFavorita = locacionesFavoritas.filter((l) => l.id !== id);
            setLocacionesFavoritas(eliminarLocacionFavorita)
        } else if (locacionFavorita){
            setLocacionesFavoritas([...locacionesFavoritas, locacionFavorita]);
        };
    };

    const locacionIsFavorita = (id) => {
        const favorito = locacionesFavoritas.some((l) => l.id === id);
        return favorito;
    };


    return(
        <LocacionesContext.Provider value={{
            locaciones,
            handlePaginaSiguienteLocacion,
            handlePaginaAnteriorLocacion,
            pageLocacion,
            pageFinalLocacion,
            handlePaginaIcicialLocacion,
            locacionesFavoritas,
            handleAgregarLocacionesFavoritas,
            locacionIsFavorita,
            }}
        >
            {children};
        </LocacionesContext.Provider>
    );
};