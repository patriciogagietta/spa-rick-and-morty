import { createContext, useEffect, useState } from "react";
import { consultarApiLocation } from "../services/fetchApi";

export const LocacionesContext = createContext();

export const LocacionesProvider = ({ children }) => {

    const [locaciones, setLocaciones] = useState([]);

    useEffect(() => {
        const obtenerLocaiones = async () => {
            try{
                const results = await consultarApiLocation();
                setLocaciones(results);
            }catch(error){
                console.error("Error al obtener las locaiones: " ,error);
                throw error;
            };
        };

        obtenerLocaiones();
    }, []);


    return(
        <LocacionesContext.Provider value={{
                locaciones,
            }}
        >
            {children};
        </LocacionesContext.Provider>
    );
};