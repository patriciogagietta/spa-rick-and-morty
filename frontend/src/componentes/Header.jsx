import { Link } from 'react-router-dom';

import logoHeader from '../assets/logo-header.webp';
import { useProductos } from '../hooks/useProductos';

export const Header = () => {

  const { handlePaginaInicio } = useProductos();

  return (
    <header className='flex  justify-between items-center mt-4'>
      <div>
        <Link to='/' onClick={handlePaginaInicio}>
          <img className='w-44' src={ logoHeader } alt="Logo Rick and Morty" />
        </Link>
      </div>

      <ul className='flex gap-10'>
        <Link to='/' onClick={handlePaginaInicio}> <p className='font-bold hover:scale-105'>Inicio</p></Link>
        <Link to='/favoritos'><p className='font-bold hover:scale-105'>Favoritos</p></Link>
        <Link to='/iniciosesion'><p className='font-bold hover:scale-105'>Inicio Sesion</p> </Link>
      </ul>
    </header>
  );
};