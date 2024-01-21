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
  failedRegisterFromService,
  succeededRegisterFromService,
  newProduct,
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

  it('Should return an object with status 500 and the right message when failing to register a new product', async function () {
    sinon.stub(productsService, 'registerProduct').resolves(failedRegisterFromService);

    const req = { params: { }, body: { name: 'ProdutoX' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.registerProduct(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: 'Unable to register product' });
  });

  it('Should return an object with status 201 and the new product data for a successful registration', async function () {
    sinon.stub(productsService, 'registerProduct').resolves(succeededRegisterFromService);

    const req = { params: { }, body: { name: 'ProdutoX' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.registerProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  });

  afterEach(function () {
    sinon.restore();
  });
});