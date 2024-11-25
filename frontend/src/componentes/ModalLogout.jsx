import { useUser } from "../hooks/useUser";
import { useProductos } from "../hooks/useProductos";

export const ModalLogout = () => {

    const { logoutUser, handleLogoutCancel } = useUser()
    const { setPersonajesFavoritos } = useProductos()

    const handleComfirLogout = () => {
        logoutUser()
        setPersonajesFavoritos([])
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded shadow-lg text-center">
                <h3 className="text-xl font-bold mb-4">¿Seguro que quiere cerrar sesion?</h3>
                <div className="flex justify-around">
                    <button onClick={handleComfirLogout} className="py-2 px-6 bg-green-600 font-bold rounded">Si</button>
                    <button onClick={handleLogoutCancel} className="py-2 px-6 bg-red-600 font-bold rounded">No</button>
                </div>
            </div>
        </div>
    );
};
