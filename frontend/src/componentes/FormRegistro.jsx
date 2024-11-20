import { Link } from "react-router-dom";

export const FormRegistro = () => {

    return (
        <div className="mt-24">
            <div className="text-center">
                <h2 className="text-4xl mb-6">Registrarse</h2>
                <p className="mb-4">
                    ¿Ya tienes cuenta? <Link to="/iniciosesion" className="text-blue-500 font-bold">Iniciar Sesión</Link>
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
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Usuario *</label>
                    <input
                        type="text"
                        placeholder="Usuario"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Contraseña *</label>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full p-2 mt-6 bg-black text-white rounded"
                >
                    Registrarse
                </button>
            </form>
        </div>
    );
}
