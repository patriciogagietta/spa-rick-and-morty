import { Header } from '../componentes/Header';
import { LocacionesFavoritasGrilla } from '../componentes/LocacionesFavoritasGrilla';
import { PersonajesFavoritosGrilla } from '../componentes/PersonajesFavoritosGrilla';
import { useLocation } from '../hooks/useLocation'
import { useProductos } from '../hooks/useProductos';

export const Favoritos = () => {

    const { locacionesFavoritas } = useLocation();
    const { personajesFavoritos } = useProductos();

    return (
        <>
            <Header />
            {
                locacionesFavoritas.length === 0 && personajesFavoritos.length === 0 ? (
                    <div className="text-center font-bold text-2xl mt-28">No hay personajes ni ubicaciones agregadas a favoritos</div>
                ) : (
                    <>
                        <PersonajesFavoritosGrilla />
                        <LocacionesFavoritasGrilla />
                    </>
                )
            }
        </>
    );
};