const { productsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const fetchAllProducts = async (_req, res) => {
  const { status, data } = await productsService.fetchAllProducts();
  return res.status(mapStatusHTTP(status)).json(data);
};

const fetchProduct = async (req, res) => {
  const { id: productId } = req.params;
  const { status, data } = await productsService.fetchProduct(productId);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  fetchAllProducts,
  fetchProduct,
};