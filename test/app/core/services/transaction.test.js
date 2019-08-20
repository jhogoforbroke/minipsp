"use strict";

const { config, contantes, exceptions } = require('../../../config/util');

const sinon  = require('sinon');
const { expect } = require('chai');

let transactionRepository,
    payable,
    card,
    unitOfWork;

unitOfWork = require(`${contantes.PATH.TEST}/mocks/unitOfWork`);

sinon.stub(unitOfWork, 'getRepository').callsFake((modelName) => {

  if(modelName === 'transaction')
    return transactionRepository;

  if(modelName === 'payable')
    return payableRepository;
});

sinon.stub(unitOfWork, 'getService').callsFake((serviceName) => {

  if(serviceName === 'payable')
    return payable;

  if(serviceName === 'card')
    return card;
});

let transaction;

describe('transaction', () => {

  beforeEach(() => {
    transaction = require(`${contantes.PATH.CORE}/services/transaction`)(unitOfWork);
  });

  it('should process validate transaction data', () => {
    transaction.validate(card, transaction)
    expect(connectStub.called).to.be.true;
  });

});
