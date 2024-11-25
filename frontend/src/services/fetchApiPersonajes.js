import axios from './axios'

// obtener todos los personajes favoritos
export const consultarPersonajesFavoritos = async () => {
    try {
        const response = await axios.get('/favorite')
        return response.data
    } catch (error) {
        console.error('Error al consultar la api de personajes favoritos: ', error);
        throw error; 
    }
}

// obtener un personaje favorito
export const consultarPersonajeFavorito = async (personaje_id) => {
    try {
        const response = await axios.get(`/favorite/${personaje_id}`)
        return response.data
    } catch (error) {
        console.error('Error al consultar la api de un personaje favorito: ', error);
        throw error; 
    }
}

// agregar un personaje favorito
export const consultarAddPersonajeFavorito = async (personajeFavorito) => {
    try {
        const response = await axios.post('/favorite', personajeFavorito)
        return response.data
    } catch (error) {
        console.error('Error al consultar la api de agregar un personaje favorito: ', error);
        throw error; 
    }
}

// borrar un personaje favorito
export const consultarDeletePersonajeFavorito = async (personajeId) => {
    try {
        const response = await axios.delete(`/favorite/${personajeId}`)
        return response.data
    } catch (error) {
        console.error('Error al consultar la api de borrar un personaje favorito: ', error);
        throw error; 
    }
}

