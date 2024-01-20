const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { 
  productsListFromService,
  invalidProductFromService,
  productFromService,
  productsListModel,
  productFromModel,
} = require('../mocks/productsMocks');

describe('Products route, Controller layer unit tests', function () {
  it('Should return an object with status 200 and an array with the right products when listing all products', async function () {
    sinon.stub(productsService, 'fetchAllProducts').resolves(productsListFromService);

    const req = { params: { }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.fetchAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsListModel);
  });

  it('Should return an object with status 404 and the right message when searching an invalid ID', async function () {
    sinon.stub(productsService, 'fetchProduct').resolves(invalidProductFromService);

    const req = { params: { id: 0 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.fetchProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Should return an object with status 200 and the right message when searching an valid ID', async function () {
    sinon.stub(productsService, 'fetchProduct').resolves(productFromService);

    const req = { params: { id: 1 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.fetchProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});