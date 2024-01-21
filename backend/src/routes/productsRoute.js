const route = require('express').Router();
const { productsController } = require('../controllers');

route.get('/', productsController.fetchAllProducts);
route.get('/:id', productsController.fetchProduct);
route.post('/', productsController.registerProduct);

module.exports = route; 