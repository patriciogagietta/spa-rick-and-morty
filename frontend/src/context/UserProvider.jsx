import { createContext, useState } from "react";
import { toast, Zoom } from 'react-toastify';

import { consultarRegistroUser } from "../services/fetchApiUsers";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAutenticado, setIsAutenticado] = useState(false)
    const [errors, setErrors] = useState(null)

    const registerUser = async (user) => {
        try {
            const response = await consultarRegistroUser(user)
            setUser(response.user)
            setIsAutenticado(true)
            toast.success('Usuario registrado correctamente', {
                position: "bottom-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom
            });
            
        } catch (error) {
            if (error.response.status === 400){
                setErrors(error.response.data.msg[0].message)
            } else if (error.response.status === 409) {
                setErrors(error.response.data.msg)
            } else {
                setErrors("Error server")
            }
        }
    }

    return (
        <UserContext.Provider value={{
            user,
            registerUser,
            isAutenticado,
            errors
        }}>
            {children}
        </UserContext.Provider>
    )
}