import Image from 'next/image'
import Link from 'next/link';
import Navbar from '../components/Navbar';
import fetchWooCommerceProducts from "../utils/wooCommerceApi";

const appetizers = ({ products }) => {

    console.log(products)
    products = products.filter(p => p.name !== 'Uncategorized')

    return (
        <>
            <Navbar />
            <div className="min-h-screen m-auto max-w-[1360px] mx-auto">
                <div className='w-full flex text-center items-center mt-14 border-2 py-5 rounded-lg'>
                    {products.map(p => (
                        <Link key={p.id} className='w-full ' href={p.name.toLowerCase()}>
                            <h2 className='font-philo'>{p.name}</h2>
                        </Link>
                    ))}
                </div>

            </div>
        </>

    )
}

export default appetizers

export const getStaticProps = async () => {
    const wooCommerceProducts = await fetchWooCommerceProducts().catch((error) =>
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
        },
        // regenerate page with new data fetch after 60 seconds
    };
};