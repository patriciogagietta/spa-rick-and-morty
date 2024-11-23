import axios from 'axios'

const API_USERS = 'http://localhost:3000/api/users'

export const consultarRegistroUser = async (user) => {
    try {
        const response = await axios.post(`${API_USERS}/register`, user)
        return response.data
    } catch (error) {
        console.error('Error al consultar la api register: ', error);
        throw error; 
    }
}