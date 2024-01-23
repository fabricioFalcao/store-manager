const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { validateNewSale } = require('../../../src/middlewares/saleValidation');

const { expect } = chai;
chai.use(sinonChai);

describe('productsValidation Middleware test', function () {
  it('should pass valid request to the endpoint', function () {
    const next = sinon.stub().returns();

    const req = { params: { }, body: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    validateNewSale(req, res, next); 

    expect(next).to.have.been.calledWith();
  }); 

  it('should pass status 400 and the right message to the endpoint in case of empty product requisition', function () {
    const next = sinon.stub().returns();

    const req = { params: { }, body: [{ quantity: 1 }, { productId: 2, quantity: 5 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    validateNewSale(req, res, next); 

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  }); 
  
  it('should pass status 400 and the right message to the endpoint in case of empty quantity requisition', function () {
    const next = sinon.stub().returns();

    const req = { params: { }, body: [{ productId: 1, quantity: 1 }, { productId: 2 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    validateNewSale(req, res, next); 

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  }); 

  it('should pass status 422 and the right message to the endpoint in case of quantity below 1', function () {
    const next = sinon.stub().returns();

    const req = { params: { }, body: [{ productId: 1, quantity: 0 }, { productId: 2, quantity: 5 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    validateNewSale(req, res, next);  

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  }); 

  afterEach(function () {
    sinon.restore();
  });
});