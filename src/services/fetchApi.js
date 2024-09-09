import axios from "axios";

export const consultarApi = async  (page) => {

    const URL = `https://rickandmortyapi.com/api/character?page=${page}`;

    try{
        const { data } = await axios(URL);
        const { results } = data;
        return results;
        
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

export const consultarApiLocation = async () => {
    const URL = 'https://rickandmortyapi.com/api/location';

    try{
        const { data } = await axios(URL);
        const { results } = data;

        return results;
    }catch(error){
        console.error("Error al consultar sobre las locaciones: ", error);
        throw error;
    };
};

export const consultarApiLocationId = async (id) => {
    const URL = `https://rickandmortyapi.com/api/location/${id}`;

    if (!id) return;

    try{
        const { data } = await axios(URL);
        if (!data) return;

        return data;
    }catch(error){
        console.error("Error al consultar por una locacion en especifico: ", error);
        throw error;
    };
};