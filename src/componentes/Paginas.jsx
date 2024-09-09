import iconIzqDesactivado from '../assets/iconos/icon-pagina-izquierda.svg'
import iconDerechaActivado from '../assets/iconos/icon-pagina-derecha-desactivada.svg'

import { useProductos } from '../hooks/useProductos'

export const Paginas = () => {

    const { handlePaginaSiguiente, handlePaginaAnterior, page } = useProductos();

    return (
        <div className='flex justify-between'>
            <div></div>
            <div className='flex gap-3 items-center'>
                <button onClick={handlePaginaAnterior}>
                    <img className={` rounded cursor-pointer w-8 ${page === 1 ? 'bg-slate-400' : 'bg-slate-800'}`} src={iconIzqDesactivado} alt="Icono Pagina Anterior" />
                </button>
                <p className='font-bold'> Pagina {page}</p>
                <button onClick={handlePaginaSiguiente}>
                    <img className='bg-gray-800 rounded cursor-pointer w-8' src={iconDerechaActivado} alt="Icono Pagina Siguiente" />
                </button>
            </div>
        </div>
  );
};