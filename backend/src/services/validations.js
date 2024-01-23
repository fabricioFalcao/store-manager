const { productsModel } = require('../models');

const checkCart = async (saleData) => {
  const productsList = await productsModel.fetchAllProducts();
  return saleData
    .every(({ productId }) => productsList
      .some(({ id }) => productId === id));
};

module.exports = {
  checkCart,

};