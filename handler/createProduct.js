const AWS = require("aws-sdk");
const {v4: uuid} = require('uuid');
AWS.config.update({region: "eu-central-1"});

const documentClient = new AWS.DynamoDB.DocumentClient();

class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequest';
    }
}

function validateQuery(queryParams) {
    if (!queryParams.title) throw new BadRequestError("Title cannot be empty.");

    if (queryParams.price <= 0) throw new BadRequestError("Price must be more than zero.");

    if (queryParams.description.length > 255) throw new BadRequestError("Description must be less than 256 symbols");
}

module.exports.createProduct = async (event) => {
    try {
        const id = uuid();
        const queryParams = event.queryStringParameters;
        validateQuery(queryParams);
        const product = await documentClient.put({
            TableName: "diveshop_products",
            Item: {
                id,
                title: queryParams.title,
                description: queryParams.description,
                price: queryParams.price,
                image: queryParams.image
            },
        }).promise();
        console.log("[Create product]:",queryParams)
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(product.Item),
        };
    } catch (e) {
        console.log("[Create product] [ERROR]:", e, "[queryParams]:", queryParams);
        if (e.name === 'BadRequest') return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({message: `ERROR: ${e}`}),
        };
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({message: `ERROR: ${e}`}),
        };
    }
};
