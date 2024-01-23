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

const registerProduct = async (productData) => {
  const newProductId = await productsModel.registerProduct(productData);

  if (!newProductId) {
    return { status: 'SERVER_ERROR', data: { message: 'Unable to register product' } };
  }
  const newProduct = await productsModel.fetchProduct(newProductId);
  return { status: 'CREATED', data: newProduct };
};

const updateProduct = async (productId, updateData) => {
  const product = await productsModel.fetchProduct(productId);
  if (!product) { return { status: 'NOT_FOUND', data: { message: 'Product not found' } }; }

  const updateCheck = await productsModel.updateProduct(productId, updateData);
  if (!updateCheck) {
    return { status: 'SERVER_ERROR', data: { message: 'Unable to update product' } };
  }
  const updatedProduct = await productsModel.fetchProduct(productId);
  return { status: 'SUCCESSFUL', data: updatedProduct };
};

module.exports = {
  fetchAllProducts,
  fetchProduct,
  registerProduct,
  updateProduct,
};