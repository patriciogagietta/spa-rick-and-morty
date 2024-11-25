import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { ProductosProvider } from './context/ProductosProvider';
import { Inicio } from './pages/Inicio';
import { Favoritos } from './pages/Favoritos';
import { InicioSesion } from './pages/InicioSesion';
import { Registro } from './pages/Registro';
import { DetallesPersonaje } from './pages/DetallesPersonaje';
import { UserProvider } from './context/UserProvider';
import { Error404 } from './pages/Error404'

function App() {

  return (
    <UserProvider>
      <ProductosProvider>
        <div className='max-w-7xl mx-auto mb-20'>
          <Routes>
            <Route path='/' element={<Inicio />}/>
            <Route path='/favoritos' element={<Favoritos />} />
            <Route path='/iniciosesion' element={<InicioSesion />} />
            <Route path='/registro' element={<Registro />} />
            <Route path='/:id' element={<DetallesPersonaje />}/>
            <Route path='/favoritos/:id' element={<DetallesPersonaje />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
        </div>
        <ToastContainer />
      </ProductosProvider>
    </UserProvider>
  );
};

export default App
