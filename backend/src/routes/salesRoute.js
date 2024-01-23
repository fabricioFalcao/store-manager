const route = require('express').Router();
const { salesController } = require('../controllers');
const { validateNewSale, validateUpdateSale } = require('../middlewares/saleValidation');

route.get('/', salesController.fetchAllSales);
route.get('/:id', salesController.fetchSale);
route.post('/', validateNewSale, salesController.registerSale);
route.delete('/:id', salesController.deleteSale);
route.put('/:saleId/products/:productId/quantity', validateUpdateSale, salesController.updateSale);

module.exports = route; 