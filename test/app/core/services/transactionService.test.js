"use strict";

const { config, contantes, exceptions } = require('../../../config/util');

const sinon  = require('sinon');
const { expect } = require('chai');

let transactionRepository,
    payableRepository,
    unitOfWork;

unitOfWork = require(`${contantes.PATH.TEST}/mocks/unitOfWork`);

sinon.stub(unitOfWork, 'getRepository').callsFake((type, serviceName) => {

  if(serviceName === 'transaction')
    return transactionRepository;

  if(serviceName === 'payable')
    return payableRepository;
});

let transactionService;

describe('transactionService', () => {

  beforeEach(() => {
    transactionService = require(`${contantes.PATH.CORE}/services/transactionService`)(unitOfWork);
  });

  it('should process validate transaction data', () => {
    transactionService.validate(card, transaction)
    expect(connectStub.called).to.be.true;
  });

});
