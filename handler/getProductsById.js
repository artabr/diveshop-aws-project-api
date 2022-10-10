const serverless = require("serverless-http");
const express = require("express");
const app = express();
const mockData = require("../data/mockData");

app.get("/products/:productId", (req, res, next) => {
    const product = mockData.products.find((product) => product.itemId === Number(req.params['productId']));
    return res.status(200).set({
        'Access-Control-Allow-Origin': '*',
    }).json(product);
});

app.use((req, res, next) => {
    return res.status(404).json({
        error: "Not Found",
    });
});

module.exports.getProductsById = serverless(app);
