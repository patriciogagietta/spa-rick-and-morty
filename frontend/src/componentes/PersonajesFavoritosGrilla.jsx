import { Link } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

export const PersonajesFavoritosGrilla = () => {

    const { personajesFavoritos, handleAgregarFavorito } = useProductos();

    return (
        personajesFavoritos.length === 0 ? (
            <div className="text-center font-bold text-2xl mt-28">No hay personajes agregados a favoritos</div>
        ) : (
            <>
                <div className='grid grid-cols-6 gap-4 mt-16'>
                    {personajesFavoritos.map((p) => (
                        <article className='flex flex-col gap-3' key={p.id}>
                            <Link to={`/favoritos/${p.id}`}>
                                <img className='rounded-3xl duration-200 hover:scale-105 cursor-pointer' src={p.image} alt={`Imagen Personaje ${p.name}`} />
                            </Link>
                            <div className='flex items-center justify-between px-2'>
                                <h4 className='font-bold'>{p.name}</h4>
                                <button className='hover:scale-105' onClick={() => handleAgregarFavorito(p.id)}>
                                    <FontAwesomeIcon icon={faHeart} style={{ color: "#f10e0e" }} />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </>
        )
    );
};