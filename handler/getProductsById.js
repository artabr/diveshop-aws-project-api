const {fetchProductsById} = require("../api/fetchData");

module.exports.getProductsById = async (event) => {
    try {
        const productId = event.pathParameters['productId']
        const product = await fetchProductsById(productId);
        if (!product) return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({message: `Product not found`}),
        };
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(product),
        };
    } catch (e) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({message: `ERROR: ${e}`}),
        };
    }
};
