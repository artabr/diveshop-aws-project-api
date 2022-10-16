const AWS = require("aws-sdk");
AWS.config.update({region: "eu-central-1"});

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.getProductsById = async (event) => {
    try {
        const productId = event.pathParameters['productId']
        const product = await documentClient.get({
            TableName: "diveshop_products",
            Key: {
                id: productId, // id is the Partition Key, '123' is the value of it
            },
        }).promise();
        if (!product) return {
            statusCode: 404,
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
            body: JSON.stringify(product.Item),
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
