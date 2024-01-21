const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { 
  productsListModel,
  productFromModel,
  productsListFromService,
  invalidProductFromService,
  productFromService,
  failedRegisterFromService,
  succeededRegisterFromService,
} = require('../mocks/productsMocks');

describe('Products route, Service layer unit tests', function () {
  it('Should return an object with status 200 and an array with the right products when listing all products', async function () {
    sinon.stub(productsModel, 'fetchAllProducts').resolves(productsListModel);

    const productsList = await productsService.fetchAllProducts();

    expect(productsList).to.be.deep.equal(productsListFromService);
  });

  it('Should return an object with status 404 and the right message when searching an invalid ID', async function () {
    sinon.stub(productsModel, 'fetchProduct').resolves(undefined);

    const product = await productsService.fetchProduct(0);

    expect(product).to.be.deep.equal(invalidProductFromService);
  });

  it('Should return an object with status 200 and the right message when searching an valid ID', async function () {
    sinon.stub(productsModel, 'fetchProduct').resolves(productFromModel);

    const product = await productsService.fetchProduct(1);

    expect(product).to.be.deep.equal(productFromService);
  });

  it('Should return an object with status 500 and the right message when failing to register a new product', async function () {
    sinon.stub(productsModel, 'registerProduct').resolves(undefined);

    const newProduct = await productsService.registerProduct({ name: 'ProdutoX' });

    expect(newProduct).to.be.deep.equal(failedRegisterFromService);
  });

  it('Should return an object with status 201 and the new product data for a successful registration', async function () {
    sinon.stub(productsModel, 'registerProduct').resolves(5);
    sinon.stub(productsModel, 'fetchProduct').resolves({ id: 4, name: 'ProdutoX' });

    const newProduct = await productsService.registerProduct({ name: 'ProdutoX' });

    expect(newProduct).to.be.deep.equal(succeededRegisterFromService);
  });

  afterEach(function () {
    sinon.restore();
  });
});