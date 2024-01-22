const route = require('express').Router();
const { salesController } = require('../controllers');

route.get('/', salesController.fetchAllSales);
route.get('/:id', salesController.fetchSale);
route.post('/', salesController.registerSale);

module.exports = route; 