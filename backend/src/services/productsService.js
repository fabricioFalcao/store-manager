const { productsModel } = require('../models');

const fetchAllProducts = async () => {
  const productsList = await productsModel.fetchAllProducts();
  if (!productsList) {
    return { status: 'NOT_FOUND', data: { message: 'Unable to retrieve products' } };
  }
  return { status: 'SUCCESSFUL', data: productsList };
};

const fetchProduct = async (productId) => {
  const product = await productsModel.fetchProduct(productId);
  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFUL', data: product };
};

module.exports = {
  fetchAllProducts,
  fetchProduct,
};