import { useLocation } from "../hooks/useLocation";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

export const LocacionesGrilla = () => {

    const { locaciones } = useLocation();

    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 mt-10'>
            {locaciones.map((l) => (
                    <article key={l.id} className='border rounded-xl p-5 hover:shadow duration-200'>
                        <div className="flex justify-between items-center">
                            <h4 className='font-bold text-lg'>{l.name}</h4>
                            <FontAwesomeIcon className="hover:scale-105 cursor-pointer" icon={faHeart} style={{ color: "#ff0000", }} />
                        </div>
                        <div className="mt-2">
                        <h4><span className="font-bold">Tipo:</span> {l.type}</h4>
                        <h4><span className="font-bold ">Dimension:</span> {l.dimension}</h4>
                        </div>
                    </article>
            ))}
        </div>
    );
};