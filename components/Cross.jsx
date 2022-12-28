import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Cross = ({ cross, agregarCarrito }) => {

  const [cantidad, setCantidad] = useState(1);

  const handleCarrito = (e) => {
    e.preventDefault();
    if (cantidad < 1) {
      alert("Cantidad no valida");
      return;
    }

    //Agregar al carrito
    // const guitarraSeleccionada = {
    //   id: product.id,
    //   name: product.name,
    //   price: product.regular_price,
    //   // image: product.Images,
    //   cantidad: cantidad
    // }

    // agregarCarrito(guitarraSeleccionada);
    toast.success('Agregado al pedido');
  }

  return (
    <>
      <form
        className="text-center "
        onSubmit={handleCarrito}
      >
        <div className="w-[270px] h-[270px] bg-black"></div>
        <h2 className="font-philo text-lg">{cross.name}</h2>
        <p className="font-philo text-base">{cross.price}</p>
        <input className='bg-[#052617] hover:bg-[#0c5836] transition duration-500 hover:shadow-md text-[#D9BF73] w-full py-2 rounded-lg font-philo text-base font-bold text-center cursor-pointer' value="AGREGAR AL CARRITO" type="submit" />
      </form>
      <ToastContainer
        autoClose={2000}
      />
    </>


  )
}

export default Cross