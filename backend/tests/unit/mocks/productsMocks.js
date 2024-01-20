const productsListDB = [
  [
    {
      id: 1,
      name: 'Mjolnir',
    },
    {
      id: 2,
      name: 'Shrinking suit',
    },
    {
      id: 3,
      name: 'Vibraniun Shield',
    },
  ],
  [],
];

const productsListModel = [
  {
    id: 1,
    name: 'Mjolnir',
  },
  {
    id: 2,
    name: 'Shrinking suit',
  },
  {
    id: 3,
    name: 'Vibraniun Shield',
  },
];

const productFromDB = [
  [
    {
      id: 1,
      name: 'Martelo de Thor',
    },
  ],
  [],
];

const productFromModel = {
  id: 1,
  name: 'Martelo de Thor',
};

const productsListFromService = { status: 'SUCCESSFUL', data: productsListModel };

const invalidProductFromService = { status: 'NOT_FOUND', data: { message: 'Product not found' } };

const productFromService = { status: 'SUCCESSFUL', data: productFromModel };

module.exports = {
  productsListModel,
  productsListDB,
  productFromDB,
  productFromModel,
  productsListFromService,
  invalidProductFromService,
  productFromService,
};