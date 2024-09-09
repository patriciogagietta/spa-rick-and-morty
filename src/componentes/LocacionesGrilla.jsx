import { useLocation } from "../hooks/useLocation";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Paginas } from "./Paginas";

export const LocacionesGrilla = () => {

    const { 
        locaciones,
        handlePaginaSiguienteLocacion, 
        handlePaginaAnteriorLocacion, 
        pageLocacion, pageFinalLocacion, 
        handleAgregarLocacionesFavoritas,
        locacionIsFavorita,
    } = useLocation();

    return (
        <>
            <div className='grid grid-cols-4 gap-4 mt-10'>
                {locaciones.map((l) => (
                        <article key={l.id} className='border rounded-xl p-5 hover:shadow duration-200'>
                            <div className="flex justify-between items-center">
                                <h4 className='font-bold text-lg'>{l.name}</h4>
                                <button className='hover:scale-105' onClick={() => handleAgregarLocacionesFavoritas(l.id)}>
                                {locacionIsFavorita(l.id)
                                    ? <FontAwesomeIcon icon={faHeart} style={{ color: "#ff0000", }} />
                                    : <FontAwesomeIcon icon={faHeart} style={{ color: "#000000", }} />
                                }
                                </button>
                            </div>
                            <div className="mt-6">
                            <h4><span className="font-bold">Tipo:</span> {l.type}</h4>
                            <h4><span className="font-bold ">Dimension:</span> {l.dimension}</h4>
                            </div>
                        </article>
                ))}
            </div>

            <Paginas 
                handlePaginaSiguiente={handlePaginaSiguienteLocacion}
                handlePaginaAnterior={handlePaginaAnteriorLocacion}
                page={pageLocacion}
                pageFinal={pageFinalLocacion}
            />
        </>
    );
};