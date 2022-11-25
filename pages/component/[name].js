import { useRouter } from 'next/router';
import { obtenerProductos, fetchWooCommerceProducts } from '../../utils/wooCommerceApi';

const Name = ({ productos }) => {

    const router = useRouter();
    const { pid } = router.query
    console.log(pid)
    return (
        <div>Name</div>
    )
}

export default Name

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