import { Header } from '../componentes/Header';
import { PersonajesFavoritosGrilla } from '../componentes/PersonajesFavoritosGrilla';
import { useProductos } from '../hooks/useProductos';

export const Favoritos = () => {
    const { personajesFavoritos } = useProductos();

    return (
        <>
            <Header />
            {
                personajesFavoritos.length === 0 ? (
                    <div className="text-center font-bold text-2xl mt-28">No hay personajes agregados a favoritos</div>
                ) : (
                    <>
                        <PersonajesFavoritosGrilla />
                    </>
                )
            }
        </>
    );
};