import Image from 'next/image'
import fetchWooCommerceProducts from "../utils/wooCommerceApi";

const products = ({ products }) => {
    console.log(products)
    return (
        <div className="min-h-screen m-auto px-10 md:px-14 w-full">
            {products.map(p => (
                <div key={p.id} className='w-full '>
                    <h2>{p.name}</h2>
                    <Image
                        // src={p.images[0].src === true ? p.images[0].src : ''}
                        alt={p.name}
                        width={300}
                        height={300}
                    />
                    <p>{p.price}</p>
                    <p>{p.short_description}</p>
                </div>
            ))}
        </div>
    )
}

export default products

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