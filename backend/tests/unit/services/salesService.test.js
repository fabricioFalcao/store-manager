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

  afterEach(function () {
    sinon.restore();
  });
});