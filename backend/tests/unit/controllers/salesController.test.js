const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { 
  salesListFromService,
  invalidSaleFromService,
  saleFromService,
  salesListModel,
  saleFromModel,
} = require('../mocks/salesMocks');

describe('Sales route, Controller layer unit tests', function () {
  it('Should return an object with status 200 and an array with the right sales when listing all sales', async function () {
    sinon.stub(salesService, 'fetchAllSales').resolves(salesListFromService);

    const req = { params: { }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.fetchAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesListModel);
  });

  it('Should return an object with status 404 and the right message when searching an invalid ID', async function () {
    sinon.stub(salesService, 'fetchSale').resolves(invalidSaleFromService);

    const req = { params: { id: 0 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.fetchSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('Should return an object with status 200 and the right message when searching an valid ID', async function () {
    sinon.stub(salesService, 'fetchSale').resolves(saleFromService);

    const req = { params: { id: 1 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.fetchSale(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});