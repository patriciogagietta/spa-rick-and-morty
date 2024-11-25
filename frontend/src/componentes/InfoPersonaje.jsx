import { useEffect, useState } from "react";
import { consultarApiId } from "../services/fetchApi";
import { useParams, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useProductos } from "../hooks/useProductos";

export const InfoPersonaje = () => {

    const [personajeId, setPersonajeId] = useState(null);
    const { handleAgregarFavorito, personajeIsFavorito } = useProductos();
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        const obtenerPersonajeId = async () => {
            try {
                const data = await consultarApiId(id);
                setPersonajeId(data)
            } catch (error) {
                console.error("Error al obtener el personaje: ", error);
                navigate('*')
                throw error;
            }
        }

        obtenerPersonajeId();
    }, [id, navigate]);

    if (!personajeId) return (
        <div className="text-center font-bold text-2xl mt-28">Loading...</div>
    );

    return (
        <div className="flex items-center justify-center mt-20">
            <div className="border rounded-lg p-8">
                <img className="rounded" src={personajeId.image} alt={personajeId.name} />
                <div>
                    <div className="flex justify-between items-start mt-5">
                        <h1 className="font-bold text-3xl max-w-32">
                            {personajeId.name}
                        </h1>
                        <div className="flex gap-4">
                            <span className={`
                                ${personajeId.status === 'Alive' ? 'bg-lime-300' :
                                personajeId.status === 'Dead' ? 'bg-red-400' :
                                personajeId.status === 'unknown' ? 'bg-gray-400' : ''}
                                p-2 rounded-lg font-bold
                            `}>
                                {personajeId.status}
                            </span>
                            <button className='hover:scale-105' onClick={() => handleAgregarFavorito(personajeId.id)}>
                                {personajeIsFavorito(personajeId.id)
                                    ? <FontAwesomeIcon icon={faHeart} style={{ color: "#ff0000", }} />
                                    : <FontAwesomeIcon icon={faHeart} style={{ color: "#000000", }} />
                                }
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between flex-col mt-5 gap-3">
                        <div className="flex items-center justify-between">
                            <p> <span className="font-bold">Especies:</span> {personajeId.species}</p>
                            <p><span className="font-bold">Genero:</span> {personajeId.gender}</p>
                        </div>
                        <div>
                            <p><span className="font-bold">Status:</span> {personajeId.status}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};