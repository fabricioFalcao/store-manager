const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { 
  salesListModel,
  saleFromModel,
  salesListFromService,
  invalidSaleFromService,
  saleFromService,
} = require('../mocks/salesMocks');
const validations = require('../../../src/services/validations');

describe('Sales route, Service layer unit tests', function () {
  it('Should return an object with status 200 and an array with the right sales when listing all sales', async function () {
    sinon.stub(salesModel, 'fetchAllSales').resolves(salesListModel);

    const salesList = await salesService.fetchAllSales();

    expect(salesList).to.be.deep.equal(salesListFromService);
  });

  it('Should return an object with status 404 and the right message when searching an invalid ID', async function () {
    sinon.stub(salesModel, 'fetchSale').resolves(undefined);

    const sale = await salesService.fetchSale(0);

    expect(sale).to.be.deep.equal(invalidSaleFromService);
  });

  it('Should return an object with status 200 and the right message when searching an valid ID', async function () {
    sinon.stub(salesModel, 'fetchSale').resolves(saleFromModel);

    const sale = await salesService.fetchSale(1);

    expect(sale).to.be.deep.equal(saleFromService);
  });

  it('Should return an object with status 404 and the right message when attempting to register a new sale with invalid product', async function () {
    sinon.stub(validations, 'checkCart').resolves(false);

    const newSale = await salesService.registerSale([
      {
        productId: 14,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ]);

    expect(newSale).to.be.deep.equal({ status: 'NOT_FOUND', data: { message: 'Product not found' } });
  });

  it('Should return an object with status 500 and the right message when failing to register a new sale', async function () {
    sinon.stub(salesModel, 'registerSale').resolves(null);

    const newSale = await salesService.registerSale([
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ]);

    expect(newSale).to.be.deep.equal({ status: 'SERVER_ERROR', data: { message: 'Unable to register sale' } });
  });

  it('Should return an object with status 201 and the new sale data for a successful registration', async function () {
    sinon.stub(salesModel, 'registerSale').resolves(14);
    sinon.stub(salesModel, 'fetchSale').resolves([
      {
        date: '2024-01-22T22:41:28.000Z',
        productId: 1,
        quantity: 1,
      },
      {
        date: '2024-01-22T22:41:28.000Z',
        productId: 2,
        quantity: 5,
      },
    ]);

    const newSale = await salesService.registerSale([
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ]);

    expect(newSale).to.be.deep.equal({ status: 'CREATED',
      data: {
        id: 14,
        itemsSold: [
          {
            productId: 1,
            quantity: 1,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      } });
  });

  afterEach(function () {
    sinon.restore();
  });
});