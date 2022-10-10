const serverless = require("serverless-http");
const express = require("express");
const app = express();
const mockData = require("../data/mockData");

app.get("/products", (req, res, next) => {
    return res.status(200).set({
        'Access-Control-Allow-Origin': '*',
    }).json(mockData.products);
});

app.use((req, res, next) => {
    return res.status(404).json({
        error: "Not Found",
    });
});

module.exports.getProductsList = serverless(app);
