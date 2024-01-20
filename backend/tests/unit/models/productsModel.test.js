const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { 
  productsListDB,
  productsListModel,
  productFromDB,
  productFromModel,
} = require('../mocks/productsMocks');

describe('Products route, Model layer unit tests', function () {
  it('Should return an array with the right objects when listing all products', async function () {
    sinon.stub(connection, 'execute').resolves(productsListDB);

    const productsList = await productsModel.fetchAllProducts();

    expect(productsList).to.be.an('array');
    expect(productsList).to.have.lengthOf(3);
    expect(productsList).to.be.deep.equal(productsListModel);
  });

  it('Should return an object with the right product data when searching by ID', async function () {
    sinon.stub(connection, 'execute').resolves(productFromDB);

    const productsList = await productsModel.fetchProduct(1);

    expect(productsList).to.be.an('object');
    expect(productsList).to.be.deep.equal(productFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});