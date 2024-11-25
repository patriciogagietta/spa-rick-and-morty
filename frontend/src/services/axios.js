import axios from "axios";

// para poder guardar la cookie
const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
})

export default instance