import Image from 'next/image'
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { obtenerProductos, fetchWooCommerceProducts } from "../utils/wooCommerceApi";

const fish = ({ products, productos }) => {

    console.log(products)
    products = products.filter(p => p.name !== 'Uncategorized')

    productos = productos.filter(pr => pr.categories[0].name === "Fish")
    console.log(productos)

    return (
        <>
            <Navbar />
            <div className="min-h-screen m-auto max-w-[1360px] mx-auto">
                <div className='w-full flex text-center items-center mt-14 border-2 py-5 px-1 rounded-lg'>
                    {products.map(p => (
                        <Link key={p.id} className='w-full' href={p.name.toLowerCase()}>
                            <h2 className='font-philo'>{p.name}</h2>
                        </Link>
                    ))}
                </div>
                <div className='w-full mt-14 py-5 px-1 flex flex-wrap justify-center'>
                    {productos.map(pr => (
                        <div className='w-1/3 items-center justify-between '>
                            <h2>{pr.name}</h2>
                            <Image
                                src={pr.images[0] ? (pr.images[0].src) : ("https://flyer250.com/restaurant/wp-content/uploads/2022/10/Escabeche-de-pescado-norkys-peruvian-restaurant-3.jpg")}
                                width={300}
                                height={300}
                                alt={pr.name}
                            />
                            <p>{pr.price}</p>
                            <Link href={`/component/${pr.name}`} className='border-2 w-full'>
                                Añadir al carrito
                            </Link>
                        </div>
                    ))}

                </div>
            </div>
        </>

    )
}

export default fish

export const getStaticProps = async () => {
    const wooCommerceProducts = await fetchWooCommerceProducts().catch((error) =>
        console.error(error)
    );

    const productosWoo = await obtenerProductos().catch((error) =>
        console.error(error)
    );

    if (!wooCommerceProducts) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            products: wooCommerceProducts.data,
            productos: productosWoo.data
        },
        // regenerate page with new data fetch after 60 seconds
    };
};