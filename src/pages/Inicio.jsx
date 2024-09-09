import { Header } from "../componentes/Header";
import { ProductosGrilla } from "../componentes/ProductosGrilla";
import { Paginas } from "../componentes/Paginas";

export const Inicio = () => {
  return (
    <>
      <Header />
      <ProductosGrilla />
      <Paginas />
    </>
  )
};