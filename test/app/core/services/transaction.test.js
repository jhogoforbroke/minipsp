"use strict";

const { config, contantes, exceptions } = require('../../../../config/util');

const sinon  = require('sinon');
const { expect } = require('chai');

let transactionRepository,
    payableRepository,
    payableService,
    cardService = { isValid: () => {} },
    unitOfWork;

unitOfWork = require(`${contantes.PATH.TEST}/mocks/unitOfWork`);

let cardIsValidSpy = sinon.spy(cardService, 'isValid');

sinon.stub(unitOfWork, 'getRepository').callsFake((modelName) => {

  if(modelName === 'transaction')
    return transactionRepository;

  if(modelName === 'payable')
    return payableRepository;
});

sinon.stub(unitOfWork, 'getService').callsFake((serviceName) => {

  if(serviceName === 'payable')
    return payableService;

  if(serviceName === 'card')
    return cardService;
});

let transactionService;

describe('transactionService', () => {

  beforeEach(() => {
    transactionService = require(`${contantes.PATH.CORE}/services/transaction`)(unitOfWork);
  });

  describe('When process validate transaction data', () => {

    let card = {},
        transaction = {
          type: contantes.CREDIT_CARD,
          amount: '9.999.999,99',
          description: 'some valid description',
        };

    it('should validate card data', () => {
      transactionService.validate(card, transaction)
      expect(cardIsValidSpy.called).to.be.true;
    });

    describe('And transaction type is undefined', () => {
      it('should invalidate transaction', () => {
        transaction.type = '';
        expect(transactionService.validate(card, transaction)).to.not.be.true;
      });
    });

    describe('And transaction type is unknown', () => {
      it('should invalidate transaction', () => {
        transaction.type = 'ANOTHERTYPETHATNOTISCREDITORDEBIT';
        expect(transactionService.validate(card, transaction)).to.not.be.true;
      });
    });

    describe('And amount is undefined', () => {
      it('should invalidate transaction', () => {
        transaction.amount = '';
        expect(transactionService.validate(card, transaction)).to.not.be.true;
      });
    });

    describe('And amount is undefined', () => {
      it('should invalidate transaction', () => {
        transaction.amount = '00,00';
        expect(transactionService.validate(card, transaction)).to.not.be.true;
      });
    });

    describe('And description is undefined', () => {
      it('should invalidate transaction', () => {
        transaction.description = '';
        expect(transactionService.validate(card, transaction)).to.not.be.true;
      });
    });

    describe('And description is empty', () => {
      it('should invalidate transaction', () => {
        transaction.description = '                               ';
        expect(transactionService.validate(card, transaction)).to.not.be.true;
      });
    });

  });

});
