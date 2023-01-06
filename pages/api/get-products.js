import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// initialise the WooCommerceRestApi //
const api = new WooCommerceRestApi({
    url: "https://flyer250.com/restaurant",
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: "wc/v3",
});

export default async function handler(req, res) {
    const responseData = {
        success: false,
        products: []
    }

    try {

        const { data } = await api.get(
            'products',
            {
                per_page: 50
            }
        );

        responseData.success = true;
        responseData.products = data;

        res.json(responseData);

    } catch (error) {
        responseData.error = error.message;
    }
}

