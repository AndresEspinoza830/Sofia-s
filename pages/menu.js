import Image from 'next/image'
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { fetchWooCommerceProducts } from "../utils/wooCommerceApi";
// import { motion } from 'framer-motion';

const menu = ({ products, carrito, eliminarProducto }) => {

    // console.log(products)
    products = products.filter(p => p.name !== 'Uncategorized')
    // products = products.map(p => (
    //     p.name = (p.name).toLowercase()
    // ))

    return (
        <>
            <Navbar carrito={carrito} eliminarProducto={eliminarProducto} />
            <div className="min-h-screen m-auto px-5 md:px-20 max-w-[1360px] mx-auto">
                <div className='w-full flex text-center items-center mt-14 border-2 py-5 px-1 rounded-lg'>
                    {products.map(p => (
                        <Link key={p.id} className='w-full' href={`/categories/${p.name}`}>
                            <h2 className='font-philo'>
                                {/* // transition={{ duration: 3 }}
                                // animate={{ */}
                                {/* //     y: 100,
                                //     color: '#D9BF73'
                                // }}> */}
                                {p.name}
                            </h2>
                        </Link>
                    ))}
                </div>
            </div>
        </>

    )
}

export default menu

export async function getServerSideProps() {
    const wooCommerceProducts = await fetchWooCommerceProducts().catch((error) =>
        console.error(error)
    );

    // const productosWoo = await obtenerProductos().catch((error) =>
    //     console.error(error)
    // );

    if (!wooCommerceProducts) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            products: wooCommerceProducts.data,
            // productos: productosWoo.data
        },
        // regenerate page with new data fetch after 60 seconds
    };
}