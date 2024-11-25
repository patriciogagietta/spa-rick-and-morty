import { Link, useNavigate } from 'react-router-dom'

import { useUser } from '../hooks/useUser'
import { useEffect } from 'react'

export const FormInicioSesion = () => {
    const { loginUser, errors: loginErrors, isAutenticado } = useUser()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value
        const user = {email, password}

        loginUser(user)
    }

    useEffect(() => {
        if (isAutenticado) {
            navigate('/')
        }
    }, [isAutenticado, navigate])

    return (
        <div className="mt-24">
            <div className="text-center">
                <h2 className="text-4xl mb-6">Iniciar sesión</h2>
                <p className="mb-4">
                    ¿Es tu primera vez? <Link to="/registro" className="text-blue-500 font-bold">Registrate</Link>
                </p>
            </div>
            <form className="mx-48" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1">Email *</label>
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                        name="email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Contraseña *</label>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                        name="password"
                        />
                </div>
                {loginErrors && (<p className='text-red-500 font-bold'>{loginErrors}</p>)}
                <button
                    type="submit"
                    className="w-full p-2 mt-6 bg-black text-white rounded"
                >
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
}
