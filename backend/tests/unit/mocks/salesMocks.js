const sale1 = {
  saleId: 1,
  date: '2024-01-21T00:59:54.000Z',
  productId: 1,
  quantity: 5,
};

const sale2 = {
  saleId: 1,
  date: '2024-01-21T00:59:54.000Z',
  productId: 2,
  quantity: 10,
};

const sale3 = {
  saleId: 2,
  date: '2024-01-21T00:59:54.000Z',
  productId: 3,
  quantity: 15,
};

const salesListDB = [
  [sale1, sale2, sale3],
  [],
];

const salesListModel = [sale1, sale2, sale3];

const saleFromDB = [
  [
    {
      date: '2024-01-21T01:34:44.000Z',
      productId: 1,
      quantity: 5,
    },
    {
      date: '2024-01-21T01:34:44.000Z',
      productId: 2,
      quantity: 10,
    },
  ],
  [],
];

const saleFromModel = [
  {
    date: '2024-01-21T01:34:44.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    date: '2024-01-21T01:34:44.000Z',
    productId: 2,
    quantity: 10,
  },
];

const salesListFromService = { status: 'SUCCESSFUL', data: salesListModel };

const invalidSaleFromService = { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

const saleFromService = { status: 'SUCCESSFUL', data: saleFromModel };

const newSaleReq = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

module.exports = {
  salesListModel,
  salesListDB,
  saleFromDB,
  saleFromModel,
  salesListFromService,
  invalidSaleFromService,
  saleFromService,
  newSaleReq,
  
};