const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { validateProduct } = require('../../../src/middlewares/productsValidations');

const { expect } = chai;
chai.use(sinonChai);

describe('productsValidation Middleware test', function () {
  it('should pass valid request to the endpoint', function () {
    const next = sinon.stub().returns();

    const req = { params: { }, body: { name: 'ProdutoX' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    validateProduct(req, res, next); 

    expect(next).to.have.been.calledWith();
  }); 

  it('should pass status 400 and the right message to the endpoint in case of empty requisition', function () {
    const next = sinon.stub().returns();

    const req = { params: { }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    validateProduct(req, res, next); 

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  }); 

  it('should pass status 422 and the right message to the endpoint in case of non string requisition', function () {
    const next = sinon.stub().returns();

    const req = { params: { }, body: { name: 8 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    validateProduct(req, res, next); 

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" must be a string' });
  }); 

  it('should pass status 422 and the right message to the endpoint in case of name with less than 5 characters requisition', function () {
    const next = sinon.stub().returns();

    const req = { params: { }, body: { name: 'Prod' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    validateProduct(req, res, next); 

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });

  afterEach(function () {
    sinon.restore();
  });
});