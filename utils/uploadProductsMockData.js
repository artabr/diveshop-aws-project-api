const AWS = require("aws-sdk");
const {v4: uuid} = require('uuid');
const mockData = require("../data/mockData");
AWS.config.update({region: "eu-central-1"});

const documentClient = new AWS.DynamoDB.DocumentClient();

console.log("Loading data into DynamoDB");

mockData.products.forEach(function (product) {
    const id = uuid();

    const tablesParams = [{
        TableName: "diveshop_products",
        Item: {
            id,
            title: product.itemName,
            description: product.itemDescription,
            price: product.itemPrice,
            image: product.itemImage
        }
    },
        {
            TableName: "diveshop_stocks",
            Item: {
                product_id: id,
                count: 100,
            }
        }];

    tablesParams.forEach((tableParams, index) => documentClient.put(tableParams, function (err) {
        if (err) {
            console.error("Can't add a product:", err);
        } else {
            console.log("Succeeded adding a product: ", product.itemName, " / ", index + 1);
        }
    }));
});