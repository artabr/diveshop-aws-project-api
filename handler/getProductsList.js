const AWS = require("aws-sdk");
AWS.config.update({region: "eu-central-1"});

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.getProductsList = async () => {
    try {
        const products = await documentClient.scan({
            TableName: "diveshop_products",
        }).promise();
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(products.Items),
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
