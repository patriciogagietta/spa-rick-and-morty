import {useProductos} from '../hooks/useProductos';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

export const ProductosGrilla = () => {

    const { producto, handleAgregarFavorito, personajeIsFavorito } = useProductos(); 

    if (!producto) 
        return (
        <div className="text-center font-bold text-2xl mt-28">Loading...</div>
    );

    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mt-10'>
            {producto.map((p) => (
                <article className='flex flex-col gap-3' key={p.id}>
                    <Link to={`/${p.id}`}>        
                        <img className='rounded-3xl duration-200 hover:scale-105 cursor-pointer' src={p.image} alt={`Imagen Personaje ${p.name}`} />
                    </Link>    
                    <div className='flex items-center justify-between px-2'>
                        <h4 className='font-bold'>{p.name}</h4>
                        <button className='hover:scale-105' onClick={() => handleAgregarFavorito(p.id)}>
                            {personajeIsFavorito(p.id)
                                ? <FontAwesomeIcon icon={faHeart} style={{ color: "#ff0000", }} />
                                : <FontAwesomeIcon icon={faHeart} style={{ color: "#000000", }} />
                            }
                        </button>
                    </div>
                </article>
            ))}
        </div>
    );
};