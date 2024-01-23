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

  afterEach(function () {
    sinon.restore();
  });
});