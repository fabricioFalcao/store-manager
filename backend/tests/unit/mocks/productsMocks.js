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

const newProductIdFromDB = { insertId: 5 };
const newProductIdFromModel = 5;

const failedRegisterFromService = { 
  status: 'SERVER_ERROR', 
  data: { message: 'Unable to register product' }, 
};

const newProduct = {
  id: 4,
  name: 'ProdutoX',
};
const succeededRegisterFromService = { status: 'CREATED', data: newProduct };

module.exports = {
  productsListModel,
  productsListDB,
  productFromDB,
  productFromModel,
  productsListFromService,
  invalidProductFromService,
  productFromService,
  newProductIdFromDB,
  newProductIdFromModel,
  failedRegisterFromService,
  succeededRegisterFromService,
  newProduct,
};