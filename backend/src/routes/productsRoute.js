const route = require('express').Router();
const { productsController } = require('../controllers');
const { validateNewProduct } = require('../middlewares/productsValidations');

route.get('/', productsController.fetchAllProducts);
route.get('/:id', productsController.fetchProduct);
route.post('/', validateNewProduct, productsController.registerProduct);

module.exports = route; 