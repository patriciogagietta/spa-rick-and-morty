import { useLocation } from "../hooks/useLocation";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

export const LocacionesFavoritasGrilla = () => {

    const { handleAgregarLocacionesFavoritas, locacionesFavoritas } = useLocation();

    console.log(locacionesFavoritas)

    return (
        locacionesFavoritas.length === 0 ? (
            <div className="text-center font-bold text-2xl mt-28">No hay ubicaciones agregadas a favoritos</div>
        ) : (
            <>
                <div>
                    <h3 className="text-3xl font-bold mt-14">Ubicaciones favoritas</h3>
                </div>
                <div className='grid grid-cols-4 gap-4 mt-6'>
                        {locacionesFavoritas.map((l) => (
                            <article className='border rounded-xl p-5 hover:shadow duration-200' key={l.id}>
                                <div className="flex justify-between items-center">
                                    <h4 className='font-bold text-lg'>{l.name}</h4>
                                    <button className='hover:scale-105' onClick={() => handleAgregarLocacionesFavoritas(l.id)}>
                                        <FontAwesomeIcon className="hover:scale-105 cursor-pointer" icon={faHeart} style={{ color: "#ff0000", }} />
                                    </button>
                                </div>
                                <div className="mt-6">
                                    <h4><span className="font-bold">Tipo:</span> {l.type}</h4>
                                    <h4><span className="font-bold ">Dimension:</span> {l.dimension}</h4>
                                </div>
                            </article>
                    ))};
                </div>
            </>
        )
    );
};