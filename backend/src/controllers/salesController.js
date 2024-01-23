const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const fetchAllSales = async (_req, res) => {
  const { status, data } = await salesService.fetchAllSales();
  return res.status(mapStatusHTTP(status)).json(data);
};

const fetchSale = async (req, res) => {
  const { id: saleId } = req.params;
  const { status, data } = await salesService.fetchSale(saleId);
  return res.status(mapStatusHTTP(status)).json(data);
};

const registerSale = async (req, res) => {
  const saleData = req.body;
  const { status, data } = await salesService.registerSale(saleData);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteSale = async (req, res) => {
  const { id: saleId } = req.params;
  const { status, data } = await salesService.deleteSale(saleId);
  return res.status(mapStatusHTTP(status)).json(data);
};

const updateSale = async (req, res) => {
  const { saleId, productId } = req.params;
  const quantity = req.body;
  const { status, data } = await salesService.updateSale(saleId, productId, quantity);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  fetchAllSales,
  fetchSale,
  registerSale,
  deleteSale,
  updateSale,
};