const { salesModel } = require('../models');

const fetchAllSales = async () => {
  const salesList = await salesModel.fetchAllSales();
  if (!salesList) {
    return { status: 'NOT_FOUND', data: { message: 'Unable to retrieve sales' } };
  }
  return { status: 'SUCCESSFUL', data: salesList };
};

const fetchSale = async (saleId) => {
  const sale = await salesModel.fetchSale(saleId);
  if (!sale || sale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCCESSFUL', data: sale };
};

module.exports = {
  fetchAllSales,
  fetchSale,
};