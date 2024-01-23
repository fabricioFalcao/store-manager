const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { 
  productsListDB,
  productsListModel,
  productFromDB,
  productFromModel,
  newProductIdFromDB,
  newProductIdFromModel,
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

  it('Should return the new product ID when successfully registering a new product', async function () {
    sinon.stub(connection, 'execute').resolves([newProductIdFromDB]);

    const insertId = await productsModel.registerProduct({ name: 'ProdutoX' });

    expect(insertId).to.equal(newProductIdFromModel);
  });

  it('Should return true when updating a product', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const updatedProduct = await productsModel.updateProduct(3, { name: 'Martelo do Batman' });

    expect(updatedProduct).to.equal(true);
  });

  it('Should return true when deleting a product', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const deletedProduct = await productsModel.deleteProduct(3);

    expect(deletedProduct).to.equal(true);
  });

  it('Should return null when searching for a non-existent product by ID', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
  
    const nonExistentProduct = await productsModel.fetchProduct(999);
  
    expect(nonExistentProduct).to.equal(undefined);
  });

  it('Should handle errors when fetching all products', async function () {
    sinon.stub(connection, 'execute').rejects(new Error('Simulated error'));
  
    try {
      // The asynchronous operation that should throw an error
      await productsModel.fetchAllProducts();
      
      // If the operation didn't throw an error, fail the test
      throw new Error('Expected an error, but none was thrown');
    } catch (error) {
      // Check that the error message matches the expected error message
      expect(error.message).to.equal('Simulated error');
    }
  });

  it('Should return false when updating a non-existent product', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);
  
    const updatedProduct = await productsModel.updateProduct(999, { name: 'Updated Product' });
  
    expect(updatedProduct).to.equal(false);
  });
  
  it('Should return false when deleting a non-existent product', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);
  
    const deletedProduct = await productsModel.deleteProduct(999);
  
    expect(deletedProduct).to.equal(false);
  });

  afterEach(function () {
    sinon.restore();
  });
});