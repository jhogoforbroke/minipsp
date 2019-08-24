"use strict";

const { config, constantes, exceptions } = require('../../../../config/util');

const sinon  = require('sinon');
const { expect } = require('chai');

let moneyService = { toInteger: (value) => value },
    unitOfWork

unitOfWork = require(`${constantes.PATH.TEST}/mocks/unitOfWork`);

let feeService;

describe('feeService', () => {

  beforeEach(() => {

    sinon.stub(unitOfWork, 'getService').callsFake((serviceName) => {

      if(serviceName === 'money')
        return moneyService;
    });

    feeService = require(`${constantes.PATH.CORE}/services/fee`)(unitOfWork);
  });

  afterEach(() => {
    unitOfWork.getService.restore();
  });

  describe('When is a Debit transaction', () => {
    it('should apply fee tax to Debit operation amount of 3%', () => {
      let value = feeService.applyFeeTax(constantes.DEBIT_CARD, 100);
      expect(value).to.deep.equal({ net: 97, gross: 100, commission: 3 });
    });
  });

  describe('When is a Credit transaction', () => {
    it('should apply fee tax to Credit operation amount of 5%', () => {
      let value = feeService.applyFeeTax(constantes.CREDIT_CARD, 100);
      expect(value).to.deep.equal({ net: 95, gross: 100, commission: 5 });
    });
  });

});
