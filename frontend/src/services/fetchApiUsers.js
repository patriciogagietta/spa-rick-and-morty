import axios from './axios'

export const consultarRegistroUser = async (user) => {
    try {
        const response = await axios.post(`/users/register`, user)
        return response.data
    } catch (error) {
        console.error('Error al consultar la api register: ', error);
        throw error; 
    }
}

export const consultarLoginUser = async (user) => {
    try {
        const response = await axios.post(`/users/login`, user)
        return response.data
    } catch (error) {
        console.error('Error al consultar la api login: ', error);
        throw error;
    }
}

export const consultarLogoutUser = async () => {
    try {
        const response = await axios.post('/users/logout')
        return response.data
    } catch (error) {
        console.error('Error al consultar la api logout: ', error);
        throw error;
    }
}

export const consultarVerifyUser = async () => {
    try {
        const response = await axios.get('/users/verify')
        return response.data
    } catch (error) {
        console.error('Error al consultar la api verify user: ', error);
        throw error;
    }
}