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

module.exports = {
  fetchAllSales,
  fetchSale,
};