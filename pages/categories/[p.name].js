import React from 'react'
import { useRouter } from 'next/router';
import { obtenerProductos } from '../../utils/wooCommerceApi';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

const Category = ({ productos, carrito, eliminarProducto }) => {

    const router = useRouter()
    const { query } = router
    const id = Object.values(query)[0]

    console.log(productos)
    productos.map(p => (
        p.description = (p.description).replace(/(<([^>]+)>)/ig, ''))
    )

    return (
        <>
            <Navbar carrito={carrito} eliminarProducto={eliminarProducto} />
            <div className="container my-12 mx-auto px-4 md:px-12">
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    {productos.map(producto => (
                        <div key={producto.id} className="my-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 min-h-[420px] flex flex-col justify-between rounded-lg">
                            <img alt="Placeholder" className="block h-auto w-full" src="/prueba.jpg"></img>
                            <div className='px-2'>
                                <h2 className='font-philo text-[#052617] uppercase'>{producto.name}</h2>
                                <h2 className='text-xl text-[#052617] font-bold'>${producto.price}</h2>
                                <p className='font-normal my-2'>
                                    {producto.description || <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae, quasi! </p>}
                                </p>
                                {/* <h3>{producto.slug}</h3> */}
                                <Link href={`/component/${producto.slug}`} className='block font-philo text-center bg-[#052617] w-full text-[#D9BF73] py-3 rounded-md hover:bg-[#0c5836] duration-1000 uppercase mb-4'>Comprar
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}

export default Category

export async function getServerSideProps({ query }) {


    const ruta = Object.values(query)[0]
    console.log(ruta)

    const productosWoo = await obtenerProductos(ruta).catch((error) =>
        console.error(error)
    );

    return {
        props: {
            productos: productosWoo.data
        },
        // regenerate page with new data fetch after 60 seconds
    };
}