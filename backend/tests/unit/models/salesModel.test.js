const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { 
  salesListDB,
  salesListModel,
  saleFromDB,
  saleFromModel,
} = require('../mocks/salesMocks');

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

  afterEach(function () {
    sinon.restore();
  });
});