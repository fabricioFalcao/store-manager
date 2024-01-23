const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { 
  salesListDB,
  salesListModel,
  saleFromDB,
  saleFromModel,
  newSaleReq,
} = require('../mocks/salesMocks');
const { getFormattedColumnNames, getFormattedPlaceholders } = require('../../../src/utils/generateFormattedQuery');

describe('Sales route, Model layer unit tests', function () {
  it('Should return an array with the right objects when listing all sales', async function () {
    sinon.stub(connection, 'execute').resolves(salesListDB);

    const salesList = await salesModel.fetchAllSales();

    expect(salesList).to.be.an('array');
    expect(salesList).to.have.lengthOf(3);
    expect(salesList).to.be.deep.equal(salesListModel);
  });

  it('Should return an array with the right sale data when searching by ID', async function () {
    sinon.stub(connection, 'execute').resolves(saleFromDB);

    const salesList = await salesModel.fetchSale(1);

    expect(salesList).to.be.an('array');
    expect(salesList).to.have.lengthOf(2);
    expect(salesList).to.be.deep.equal(saleFromModel);
  });

  it('Should return the new sale data when successfully registering a new sale', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);

    const insertId = await salesModel.registerSale(newSaleReq);

    expect(insertId).to.equal(5);
  });

  it('Should handle errors when fetching a sale by ID', async function () {
    sinon.stub(connection, 'execute').throws(new Error('Simulated fetch error'));

    try {
      await salesModel.fetchSale(1);
    } catch (error) {
      expect(error.message).to.equal('Simulated fetch error');
    }
  });

  it('Should handle errors when deleting a sale', async function () {
    sinon.stub(connection, 'execute').throws(new Error('Simulated delete error'));

    try {
      await salesModel.deleteSale(1);
    } catch (error) {
      expect(error.message).to.equal('Simulated delete error');
    }
  });

  it('Should return the new sale ID when successfully registering a new sale', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);
  
    const insertId = await salesModel.registerSale(newSaleReq);
  
    // Ensure that the execute method is called with the expected query
    const expectedQuery = 'INSERT INTO sales (date) VALUES (NOW())';
    expect(connection.execute).to.have.been.calledWith(expectedQuery);
  
    // Ensure that the execute method is called for each saleData item
    const expectedSaleProductQueries = newSaleReq.map((item) => {
      const saleProduct = { saleId: 5, ...item };
      const columns = getFormattedColumnNames(saleProduct);
      const placeholders = getFormattedPlaceholders(saleProduct);
      return `INSERT INTO sales_products (${columns}) VALUES (${placeholders});`;
    });
  
    expectedSaleProductQueries.forEach((testQuery) => {
      expect(connection.execute).to.have.been.calledWith(testQuery, sinon.match.array);
    });
  
    expect(insertId).to.equal(5);
  });

  it('Should handle errors when registering a new sale', async function () {
    sinon.stub(connection, 'execute').throws(new Error('Simulated register error'));

    try {
      await salesModel.registerSale(newSaleReq);
    } catch (error) {
      expect(error.message).to.equal('Simulated register error');
    }
  });

  it('Should return true when successfully updating a sale', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const updatedSale = await salesModel.updateSale(1, 2, { quantity: 5 });

    expect(updatedSale).to.equal(true);
  });

  it('Should handle errors when updating a sale', async function () {
    sinon.stub(connection, 'execute').throws(new Error('Simulated update error'));

    try {
      await salesModel.updateSale(1, 2, { quantity: 5 });
    } catch (error) {
      expect(error.message).to.equal('Simulated update error');
    }
  });

  it('Should return true when successfully deleting a sale', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const deletedSale = await salesModel.deleteSale(1);

    expect(deletedSale).to.equal(true);
  });

  it('Should handle errors when fetching all sales', async function () {
    sinon.stub(connection, 'execute').throws(new Error('Simulated fetch all error'));

    try {
      await salesModel.fetchAllSales();
    } catch (error) {
      expect(error.message).to.equal('Simulated fetch all error');
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});