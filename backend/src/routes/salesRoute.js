const route = require('express').Router();
const { salesController } = require('../controllers');
const { validateNewSale } = require('../middlewares/saleValidation');

route.get('/', salesController.fetchAllSales);
route.get('/:id', salesController.fetchSale);
route.post('/', validateNewSale, salesController.registerSale);
route.delete('/:id', salesController.deleteSale);

module.exports = route; 