const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { 
  productsListDB,
  productsListModel,
  productDB,
  productModel,
} = require('../mocks/productsMocks');

describe('Model layer unit tests', function () {
  it('Should return an array with the right objects', async function () {
    sinon.stub(connection, 'execute').resolves(productsListDB);

    const productsList = await productsModel.fetchAllProducts();

    expect(productsList).to.be.an('array');
    expect(productsList).to.have.lengthOf(3);
    expect(productsList).to.be.deep.equal(productsListModel);
  });

  it('Should return an object with the right product data', async function () {
    sinon.stub(connection, 'execute').resolves(productDB);

    const productsList = await productsModel.fetchProduct(1);

    expect(productsList).to.be.an('object');
    expect(productsList).to.be.deep.equal(productModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});