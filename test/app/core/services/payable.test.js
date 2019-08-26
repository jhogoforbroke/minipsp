"use strict";

const { config, constantes, exceptions } = require('../../../../config/util');

let moment = require('moment');

const sinon  = require('sinon');
const { expect } = require('chai');

let unitOfWork,
    payableRepositoryCreateSpy,
    payableRepositoryGetAllStub,
    transactionRepositoryGetAllStub,
    payableRepository = { create: () => {}, getAll: () => {} },
    transactionRepository = { getAll: () => {} };

unitOfWork = require(`${constantes.PATH.TEST}/mocks/unitOfWork`);

let payables = [{ id: 1, transactionId: 1 }, { id: 2, transactionId: 2 }, { id: 3, transactionId: 3 }];
let transactions = [{ id: 1 }, { id: 2 }, { id: 3 }];

let payableService;

describe('payableService', () => {

  beforeEach(() => {

    sinon.stub(unitOfWork, 'getRepository').callsFake((modelName) => {
      if(modelName === 'payable')
        return payableRepository;

      if(modelName === 'transaction')
        return transactionRepository;
    });

    payableRepositoryCreateSpy = sinon.spy(payableRepository, 'create');

    payableRepositoryGetAllStub =
      sinon.stub(payableRepository, 'getAll').callsFake(() => {
        return new Promise((resolve, reject) => {
          resolve(payables)
        });
      });

    transactionRepositoryGetAllStub =
      sinon.stub(transactionRepository, 'getAll').callsFake(() => {
        return new Promise((resolve, reject) => {
          resolve(transactions)
        });
      });

    payableService = require(`${constantes.PATH.CORE}/services/payable`)(unitOfWork);
  });

  afterEach(() => {
    payableRepositoryCreateSpy.restore();
    payableRepositoryGetAllStub.restore();
    transactionRepositoryGetAllStub.restore();
    unitOfWork.getRepository.restore();
  });

  describe('When return a payable info list', () => {

    it('should get all payables with transactions info', function(done) {

      payableService.payables()
      .then((payables) => {

        expect(payableRepositoryGetAllStub.called).to.be.true;

        expect(transactionRepositoryGetAllStub.called).to.be.true;

        let args = transactionRepositoryGetAllStub.args[0][0];
        expect(args).to.be.deep.equal({ id: transactions.map(x => x.id) });

        payables.forEach((payable) => {
          expect(payable.transaction).to.not.be.undefined;
        });

        done();
      });

    });

  });

  describe('When register a payable', () => {

    let transaction;

    beforeEach(() => {
      transaction = {
        id: 123,
        net: 199
      };
    });

    describe(`And is a DEBIT transaction`, () => {

      let args;

      beforeEach(() => {
        transaction.type = constantes.DEBIT_CARD;
        payableService.register(transaction);

        args = payableRepositoryCreateSpy.args[0][0];
      });

      it('Should register payment status as paid', () => {
        expect(args.status).to.equal(constantes.PAYMENT_SATUS.PAID);
      });

      it('Should register payment date in D+0 date', () => {
        let now = new Date();
        expect(moment(args.paymentDate).format()).to.equal(moment(now).format())
      });

      it('should create payable', () => {
        expect(payableRepositoryCreateSpy.called).to.be.true;
      });

    });

    describe(`And is a CREDIT transaction`, () => {

      let args;

      beforeEach(() => {
        transaction.type = constantes.CREDIT_CARD;
        payableService.register(transaction);

        args = payableRepositoryCreateSpy.args[0][0];
      });

      it('Should register payment status as waiting funds', () => {
        expect(args.status).to.equal(constantes.PAYMENT_SATUS.WAITING_FUNDS);
      });

      it('Should register payment date in D+30 date', () => {
        let _30DaysInFutureDate = new Date(moment().add(30, 'day').format());
        expect(moment(args.paymentDate).format()).to.equal(moment(_30DaysInFutureDate).format());
      });

      it('should create payable', () => {
        expect(payableRepositoryCreateSpy.called).to.be.true;
      });

    });

    describe(`And there's no registered transaction`, () => {

      beforeEach(() => {
        delete transaction.id;
      });

      it('should set Invalid transaction', () => {
        try {
          payableService.register(transaction);
        } catch (err) {
          expect(err).to.be.an('Error');
          expect(err.name).to.equal('InvalidTransactionData');
        }
      });

      it('should not create payable', () => {
        expect(payableRepositoryCreateSpy.called).to.not.be.true;
      });
    });

    describe(`And there's no net amount value`, () => {

      beforeEach(() => {
        delete transaction.net;
      });

      it('should set Invalid transaction', () => {
        try {
          payableService.register(transaction);
        } catch (err) {
          expect(err).to.be.an('Error');
          expect(err.name).to.equal('InvalidTransactionData');
        }
      });

      it('should not create payable', () => {
        expect(payableRepositoryCreateSpy.called).to.not.be.true;
      });
    });
  });

});
