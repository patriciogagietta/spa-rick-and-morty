import { createContext, useEffect, useState } from "react";
import { toast, Zoom } from 'react-toastify';
import Cookies from 'js-cookie';

import { consultarRegistroUser, consultarLoginUser, consultarVerifyUser, consultarLogoutUser } from "../services/fetchApiUsers";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAutenticado, setIsAutenticado] = useState(false)
    const [errors, setErrors] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

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

    const loginUser = async (user) => {
        try {
            const response = await consultarLoginUser(user)
            setUser(response.user)
            setIsAutenticado(true)
            toast.success('Sesion iniciada correctamente', {
                position: "bottom-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom
            });
        } catch (error) {
            if (error.response.status === 400) {
                setErrors(error.response.data.msg[0].message)
            } else if (error.response.status === 409) {
                setErrors(error.response.data.msg)
            } else {
                setErrors("Error server")
            }
        }
    }

    const logoutUser = async () => {
        try {
            await consultarLogoutUser()
            setUser(null)
            setIsAutenticado(false)
            setModalVisible(false)
            toast.success('Sesion cerrada correctamente', {
                position: "bottom-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom
            });
                        
        } catch {
            setErrors('Error al cerrar sesión');
        }
    }

    // limpiar el error cada 3 seg y si cambia de pestaña se hace el clearTimeout
    useEffect(() => {
        const time = setTimeout(() => {
            setErrors(null)
        }, 3000)
        return () => clearTimeout(time)
    }, [errors])

    // obtener cookies cuando se renderiza la app para saber si un usuario esta logueado
    useEffect(() => {
        const verifyUser = async () => {
            const cookies = Cookies.get()

            if (cookies.token) {
                try {
                    const response = await consultarVerifyUser(cookies.token)
                    if (!response.user) {
                        return setIsAutenticado(false)
                    }
                    setIsAutenticado(true)
                    setUser(response.user)

                } catch {
                    setIsAutenticado(false)
                    setUser(null)
                }
            }
        }
        verifyUser()
    }, [])

    const handleLogout = () => {
        setModalVisible(true)
    }

    const handleLogoutCancel = () => {
        setModalVisible(false)
    }

    return (
        <UserContext.Provider value={{
            user,
            registerUser,
            isAutenticado,
            errors,
            loginUser,
            logoutUser,
            modalVisible,
            handleLogout,
            handleLogoutCancel
        }}>
            {children}
        </UserContext.Provider>
    )
}