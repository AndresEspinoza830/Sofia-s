import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// initialise the WooCommerceRestApi //
const api = new WooCommerceRestApi({
    url: "https://flyer250.com/restaurant",
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: "wc/v3",
});

// fetch all products from WooCommerce //
export async function fetchWooCommerceProducts() {
    try {
        const response = await api.get("products/categories");
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export async function obtenerProductos() {
    try {
        const response = await api.get("products?per_page=100");
        return response;
    } catch (error) {
        throw new Error(error);
    }
}