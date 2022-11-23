
import { useState } from 'react';
import supabase from '../../config/supabaseclient';
import Navbar from '../../components/Navbar';

const Dish = ({ temporal, agregarCarrito }) => {

    const [cantidad, setCantidad] = useState(1);

    const miller = temporal[0]

    const handleCarrito = (e) => {
        e.preventDefault();
        if (cantidad < 1) {
            alert("Cantidad no valida");
            return;
        }

        //Agregar al carrito
        const guitarraSeleccionada = {
            id: miller.ID,
            name: miller.Name,
            price: miller.Regular_price,
            image: miller.Images,
            cantidad: cantidad
        }

        agregarCarrito(guitarraSeleccionada);
    }


    return (
        <>
            <Navbar
            />
            <div className='max-w-[1260px] px-2 md:px-10 py-8 mx-auto'>
                <div className='w-full md:mx-2'>
                    <div>
                        <a href="/menu">
                            <svg
                                viewBox="0 0 1024 1024" version="1.1"
                                width={50}
                                className="cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg"><path d="M807.313723 464.738462H300.165908l197.151507-198.340924a31.507692 31.507692 0 1 0-44.693661-44.425846l-250.549169 252.061539c-0.291446 0.291446-0.488369 0.638031-0.764062 0.937354a31.452554 31.452554 0 0 0-3.111385 3.828184c-0.543508 0.8192-0.9216 1.701415-1.386338 2.552123-0.512 0.945231-1.079138 1.858954-1.496615 2.859323-0.441108 1.063385-0.701046 2.174031-1.016123 3.2768-0.252062 0.866462-0.590769 1.701415-0.764062 2.599385a31.484062 31.484062 0 0 0 0 12.319508c0.181169 0.897969 0.512 1.725046 0.764062 2.591507 0.322954 1.102769 0.575015 2.213415 1.016123 3.2768 0.417477 1.000369 0.984615 1.906215 1.496615 2.851447 0.464738 0.858585 0.842831 1.7408 1.394215 2.56 0.913723 1.370585 1.992862 2.615138 3.111385 3.828184 0.275692 0.299323 0.472615 0.645908 0.764062 0.937354l250.549169 252.061538a31.405292 31.405292 0 0 0 22.346831 9.29477 31.515569 31.515569 0 0 0 22.34683-53.720616L300.165908 527.753846h507.147815a31.507692 31.507692 0 0 0 0-63.015384z" fill="" /></svg>
                        </a>
                        <h2 className="text-[#00833e] text-3xl font-extrabold mb-6 font-abc">{miller.Name}</h2>
                    </div>
                    <div className='flex flex-col-reverse md:flex-row w-full'>
                        <form
                            className='w-full md:w-3/5 mr-2'
                            onSubmit={handleCarrito}
                        >
                            <h3 className='font-abc font-bold text-xl mb-2'>Descripcion</h3>
                            <p className='font-abc text-xl text-[#555555] mb-5'>{miller.Shortdescription}</p>
                            <h3 className='font-abc font-bold text-xl mb-4'>Observaciones del producto</h3>
                            <div className='flex flex-col mb-5'>
                                <input type="text" id='mensaje' className='bg-transparent border outline-offset-0 rounded-lg text-black px-8 py-3 focus:outline-none' />
                                <label htmlFor="mensaje" className='font-abc font-light text-sm'>Máximo 30 caracteres</label>
                            </div>
                            <div className='flex items-center mb-5'>
                                <h3 className='font-abc font-bold text-xl mb-2'>Cantidad</h3>
                                <div className='flex flex-row h-10 rounded-lg relative bg-transparent ml-4'>
                                    <select
                                        className='w-24 text-center'
                                        value={cantidad}
                                        onChange={e => setCantidad(Number(e.target.value))}
                                    >
                                        <option value="">--Seleccione--</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>


                            </div>
                            <div>
                                <h3 className='font-abc font-bold text-xl mb-5'>Opciones:</h3>

                            </div>
                            <h3 className='font-abc font-extrabold text-4xl mb-8 text-[#00833e]'>${miller.Regular_price}</h3>
                            <input className='bg-[#00833e] hover:bg-[#085d30] transition duration-500 hover:shadow-md hover:shadow-[#00833e] text-[#fed925] w-full py-3 rounded-lg font-abc text-xl font-bold text-center cursor-pointer' value="AGREGAR AL CARRITO" type="submit" />
                        </form>
                        <div className='w-full md:w-2/5  mb-4 '>
                            <img src={miller.Images} className="w-full m-0 h-auto rounded-md " objecfit="contain" alt='imagen' />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async ({ query: { name } }) => {
    // const temporal = [];
    const { data, error } = await supabase
        .from('productos')
        .select()
    if (error) {
        console.log("error:".error)
    }
    if (data) {
        var temporal = data.filter(dish => {
            // console.log(dish)
            if (dish.Name == name) {

                // console.log(dish)

                // let count = count++
                // console.log(dish)
                // return dish;¡
                return dish;
            }
        })
    }

    return {
        props: {
            temporal
        }
    }
}
export default Dish;

