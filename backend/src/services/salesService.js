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

const registerSale = async (saleData) => {
  const id = await salesModel.registerSale(saleData);
  const sale = await salesModel.fetchSale(id);
  if (!id || !sale || sale.length === 0) {
    return { status: 'SERVER_ERROR', data: { message: 'Unable to register sale' } };
  }
  const itemsSold = sale.map((item) => {
    const { date, ...newObj } = item;
    return newObj;
  });
  return { status: 'CREATED', data: { id, itemsSold } };
};

module.exports = {
  fetchAllSales,
  fetchSale,
  registerSale,
};