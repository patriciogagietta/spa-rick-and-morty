import { Routes, Route } from 'react-router-dom'
import { ProductosProvider } from './context/ProductosProvider';
import { Inicio } from './pages/Inicio';
import { Ubicacion } from './pages/Ubicaciones';
import { Favoritos } from './pages/Favoritos';
import { InicioSesion } from './pages/InicioSesion';
import { DetallesPersonaje } from './pages/DetallesPersonaje';
import { LocacionesProvider } from './context/LocacionesProvider';

function App() {

  return (
    <ProductosProvider>
      <LocacionesProvider>
        <div className='max-w-7xl mx-auto mb-20'>
          <Routes>
            <Route path='/' element={<Inicio />}/>
            <Route path='/ubicacion' element={<Ubicacion />} />
            <Route path='/favoritos' element={<Favoritos />} />
            <Route path='/iniciosesion' element={<InicioSesion />} />
            <Route path='/:id' element={<DetallesPersonaje />}/>
            <Route path='/favoritos/:id' element={<DetallesPersonaje />} />
          </Routes>
        </div>
      </LocacionesProvider>
    </ProductosProvider>
  );
};

export default App
