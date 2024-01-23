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

  it('Should return an object with status NOT_FOUND and the right message when updating and inexistent product', async function () {
    sinon.stub(productsModel, 'fetchProduct').resolves(undefined);

    const updatedProduct = await productsService.updateProduct(0, { name: 'Manopla do Infinito' });

    expect(updatedProduct).to.be.deep.equal(invalidProductFromService);
  });

  it('Should return an object with status SERVER_ERROR and the right message when failing to update a product', async function () {
    sinon.stub(productsModel, 'fetchProduct').resolves({ id: 1, name: 'Mjolnir' });
    sinon.stub(productsModel, 'updateProduct').resolves(false);

    const updatedProduct = await productsService.updateProduct(1, { name: 'Olho de Agamoto' });

    expect(updatedProduct).to.be.deep.equal({ status: 'SERVER_ERROR', data: { message: 'Unable to update product' } });
  });

  it('Should return an object with status SUCCESSFUL and the right message when succeeding to update a product', async function () {
    sinon.stub(productsModel, 'fetchProduct')
      .onFirstCall()
      .resolves({ id: 1, name: 'Mjolnir' })
      .onSecondCall()
      .resolves({ id: 1, name: 'Martelo do Batman' });
      
    sinon.stub(productsModel, 'updateProduct').resolves(true);

    const updatedProduct = await productsService.updateProduct(1, { name: 'Martelo do Batman' });

    expect(updatedProduct).to.be.deep.equal({ status: 'SUCCESSFUL', data: { id: 1, name: 'Martelo do Batman' } });
  });

  it('Should return an object with status NOT_FOUND and the right message when deleting and inexistent product', async function () {
    sinon.stub(productsModel, 'fetchProduct').resolves(undefined);

    const deletedProduct = await productsService.deleteProduct(0);

    expect(deletedProduct).to.be.deep.equal(invalidProductFromService);
  });

  it('Should return an object with status SERVER_ERROR and the right message when failing to delete a product', async function () {
    sinon.stub(productsModel, 'fetchProduct').resolves({ id: 1, name: 'Mjolnir' });
    sinon.stub(productsModel, 'deleteProduct').resolves(false);

    const deletedProduct = await productsService.deleteProduct(1);

    expect(deletedProduct).to.be.deep.equal({ status: 'SERVER_ERROR', data: { message: 'Unable to delete product' } });
  });

  it('Should return an object with status SUCCESSFUL and the right message when succeeding to delete a product', async function () {
    sinon.stub(productsModel, 'fetchProduct').resolves({ id: 1, name: 'Mjolnir' });
    sinon.stub(productsModel, 'deleteProduct').resolves(true);

    const deletedProduct = await productsService.deleteProduct(1);

    expect(deletedProduct).to.be.deep.equal({ status: 'NO_CONTENT' });
  });

  // productsService.test.js
  it('Should handle the case when productsList is falsy', async function () {
  // Stubbing productsModel.fetchAllProducts to return falsy value
    sinon.stub(productsModel, 'fetchAllProducts').resolves(null);

    const result = await productsService.fetchAllProducts();

    // Add assertions based on the expected behavior when productsList is falsy
    expect(result).to.deep.equal({ status: 'NOT_FOUND', data: { message: 'Unable to retrieve products' } });

    // Restore the stub after the test
    sinon.restore();
  });

  afterEach(function () {
    sinon.restore();
  });
});