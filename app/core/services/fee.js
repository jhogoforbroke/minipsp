'use strict';

const { constantes } = require('../../../config/util');

const Dinero = require('dinero.js')

let moneyService;

module.exports = (unitOfWork) => {

  moneyService = unitOfWork.getService('money');

  const applyFeeTax = (transactionType, value) => {

    value = Dinero({ amount: moneyService.toInteger(value), currency: 'BRL' })

    switch (transactionType) {
      case constantes.DEBIT_CARD:
        return applyDebitTax(value);
        break;

      case constantes.CREDIT_CARD:
        return applyCreditTax(value);
        break;
    }

    throw new exceptions.InvalidTransactionData();
  };

  const applyDebitTax = (value) => {

    let gross = value.getAmount();
    let net = value.subtract(value.percentage(constantes.DEBIT_TAX)).getAmount();
    let commission = value.percentage(constantes.DEBIT_TAX).getAmount();

    return {
      net,
      gross,
      commission
    };
  };

  const applyCreditTax = (value) => {

    let gross = value.getAmount();
    let net = value.subtract(value.percentage(constantes.CREDIT_TAX)).getAmount();
    let commission = value.percentage(constantes.CREDIT_TAX).getAmount();

    return {
      net,
      gross,
      commission
    };
  };

  return {
    applyFeeTax
  };
};
