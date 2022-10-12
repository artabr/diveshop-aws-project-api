const mockData = require("../data/mockData");

exports.fetchProducts = () => new Promise((resolve) => {
    setTimeout(() => resolve(mockData.products), 50);
});

exports.fetchProductsById = (id) => new Promise((resolve) => {
    const product = mockData.products.find((product) => product.itemId === Number(id));
    setTimeout(() => {
        resolve(product)
    }, 50);
});
