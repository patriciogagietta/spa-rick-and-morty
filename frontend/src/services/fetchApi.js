import axios from "axios";

export const consultarApi = async  (page) => {

    const URL = `https://rickandmortyapi.com/api/character?page=${page}`;

    try{
        const { data } = await axios(URL);
        return data;
        
    } catch(error) {
        console.error('Error al consultar la API: ', error);
        throw error; 
    };
};

export const consultarApiId = async (id) => {

    const URL = `https://rickandmortyapi.com/api/character/${id}`;

    if (!id) return;

    try {
        const { data } = await axios(URL);
        if (!data) return;
        return data;

    }catch(error){
        console.error('Error al consultar sobre un personaje en especifico: ' , error);
        throw error;
    };
};

export const consultarApiLocation = async (page) => {
    const URL = `https://rickandmortyapi.com/api/location?page=${page}`;

    try{
        const { data } = await axios(URL);

        return data;
    }catch(error){
        console.error("Error al consultar sobre las locaciones: ", error);
        throw error;
    };
};