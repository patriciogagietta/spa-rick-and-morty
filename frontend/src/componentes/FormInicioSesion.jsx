import { useState } from 'react';
import { Link } from 'react-router-dom'

export const FormInicioSesion = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="mt-24">
            <div className="text-center">
                <h2 className="text-4xl mb-6">Iniciar sesión</h2>
                <p className="mb-4">
                    ¿Es tu primera vez? <Link to="/registro" className="text-blue-500 font-bold">Registrate</Link>
                </p>
            </div>
            <form className="mx-48">
                <div className="mb-4">
                    <label className="block mb-1">Email *</label>
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Contraseña *</label>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                </div>
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
