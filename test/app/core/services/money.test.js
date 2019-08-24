"use strict";

const { config, constantes, exceptions } = require('../../../../config/util');

const sinon  = require('sinon');
const { expect } = require('chai');

let unitOfWork

unitOfWork = require(`${constantes.PATH.TEST}/mocks/unitOfWork`);

let moneyService;

describe('moneyService', () => {

  beforeEach(() => {
    moneyService = require(`${constantes.PATH.CORE}/services/money`)(unitOfWork);
  })

  it('should format string values to integer', () => {
    let ret = moneyService.toInteger('R$ 83,55');
    expect(ret).to.deep.equal(8355);

    ret = moneyService.toInteger('1,99');
    expect(ret).to.deep.equal(199);

    ret = moneyService.toInteger('U$1.999.999,20');
    expect(ret).to.deep.equal(199999920);
  });

  it('should format float values to integer', () => {
    let ret = moneyService.toInteger(1.99);
    expect(ret).to.deep.equal(199);
  });

});
