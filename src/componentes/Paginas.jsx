import iconIzqDesactivado from '../assets/iconos/icon-pagina-izquierda.svg';
import iconDerechaActivado from '../assets/iconos/icon-pagina-derecha-desactivada.svg';

export const Paginas = ({ handlePaginaSiguiente, handlePaginaAnterior, page, pageFinal}) => {

    return (
        <div className='flex justify-between mt-10'>
            <div></div>
            <div className='flex gap-3 items-center'>
                <button onClick={handlePaginaAnterior}>
                    <img className={`rounded cursor-pointer w-8 ${page === 1 ? 'bg-slate-400' : 'bg-slate-800'}`} src={iconIzqDesactivado} alt="Icono Pagina Anterior" />
                </button>
                <p className='font-bold'> Pagina {page} de {pageFinal}</p>
                <button onClick={handlePaginaSiguiente}>
                    <img className={`rounded cursor-pointer w-8 ${page === pageFinal ? 'bg-slate-400' : 'bg-gray-800 '}`} src={iconDerechaActivado} alt="Icono Pagina Siguiente" />
                </button>
            </div>
        </div>
  );
};