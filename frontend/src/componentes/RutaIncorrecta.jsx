import { Link } from 'react-router-dom';

const RutaIncorrecta = () => {
    return (
        <div className="text-center mt-20">
            <h1 className="text-3xl font-bold mb-8">404 - Ruta Incorrecta</h1>
            <Link to="/" className="w-full py-2 px-4 bg-black text-white rounded">
                Volver al Inicio
            </Link>
        </div>
    );
};

export default RutaIncorrecta;
