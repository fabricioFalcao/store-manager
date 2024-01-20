const sale1 = {
  id: 1,
  date: '2024-01-19T20:08:58.000Z',
};

const sale2 = {
  id: 2,
  date: '2024-01-19T20:08:58.000Z',
};

const salesListDB = [
  [sale1, sale2],
  [],
];

const salesListModel = [sale1, sale2];

const saleFromDB = [
  [sale1],
  [],
];

const saleFromModel = sale1;

const salesListFromService = { status: 'SUCCESSFUL', data: salesListModel };

const invalidSaleFromService = { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

const saleFromService = { status: 'SUCCESSFUL', data: saleFromModel };

module.exports = {
  salesListModel,
  salesListDB,
  saleFromDB,
  saleFromModel,
  salesListFromService,
  invalidSaleFromService,
  saleFromService,
};