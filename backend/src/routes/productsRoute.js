const route = require('express').Router();
const { productsController } = require('../controllers');
const { validateProduct } = require('../middlewares/productsValidations');

route.get('/', productsController.fetchAllProducts);
route.get('/:id', productsController.fetchProduct);
route.post('/', validateProduct, productsController.registerProduct);
route.put('/:id', validateProduct, productsController.updateProduct);

module.exports = route; 