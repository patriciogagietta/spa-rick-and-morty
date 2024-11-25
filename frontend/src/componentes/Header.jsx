import { Link } from 'react-router-dom';

import logoHeader from '../assets/logo-header.webp';
import { useProductos } from '../hooks/useProductos';
import { useUser } from '../hooks/useUser';
import { ModalLogout } from './ModalLogout';

export const Header = () => {

  const { handlePaginaInicio } = useProductos();
  const { isAutenticado, modalVisible, handleLogout } = useUser()

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
        {isAutenticado ? (
          <>
            <button onClick={handleLogout} className='font-bold hover:scale-105'>Cerrar Sesion</button>
            {modalVisible && <ModalLogout />}
          </>
        ) : (
          <Link to='/iniciosesion'><p className='font-bold hover:scale-105'>Iniciar Sesion</p> </Link>
        )}
      </ul>
    </header>
  );
};