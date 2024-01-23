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

const registerProduct = async (req, res) => {
  const productData = req.body;
  const { status, data } = await productsService.registerProduct(productData);
  return res.status(mapStatusHTTP(status)).json(data);
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const updateData = req.body;
  const { status, data } = await productsService.updateProduct(productId, updateData);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const { status, data } = await productsService.deleteProduct(productId);
  return res.status(mapStatusHTTP(status)).json(data);
};

const searchProduct = async (req, res) => {
  const { q: term } = req.query;
  const { status, data } = await productsService.searchProduct(term);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  fetchAllProducts,
  fetchProduct,
  registerProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};