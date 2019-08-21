'use strict';

const { contantes } = require('../../../config/util');

const Dinero = require('dinero.js')

let transactionRepository,
    payableRepository,
    cardService;

module.exports = (unitOfWork) => {

  transactionRepository = unitOfWork.getRepository('transaction');
  payableRepository = unitOfWork.getRepository('payable');

  cardService = unitOfWork.getService('card');

  const DEBIT_TAX = 3;
  const CREDIT_TAX = 5;

  const applyFeeTax = (transactionType, value) => {
    switch (transactionType) {
      case contantes.DEBIT_CARD:
        return applyDebitFeeTax(value);
        break;

      case contantes.DEBIT_CARD:
        return applyCreditFeeTax(value);
        break;
    }

    throw new exceptions.InvalidTransactionData();
  };

  const applyDebitFeeTax = (value) => {

    let gross = value;
    let net = value.subtract(value.percentage(DEBIT_TAX));
    let commission = value.percentage(DEBIT_TAX);

    return {
      net,
      gross,
      commission
    };
  };

  const applyCreditFeeTax = (value) => {

    let gross = value;
    let net = value.subtract(value.percentage(CREDIT_TAX));
    let commission = value.percentage(CREDIT_TAX);

    return {
      net,
      gross,
      commission
    };
  };

  const hideCardNumber = (cardNumber) => {
    return `XXXX-XXXX-XXXX-${cardNumber.substr(12, 5)}`;
  };

  const validate = (card, transaction) =>
          cardService.isValid(card)
          && isValidType(transaction.type)
          && isValidAmount(transaction.amount)
          && isValidDescription(transaction.description);

  const isValidType = (type) => !!type && contantes.TRANSACTION_TYPE_OPTIONS.includes(type);

  const isValidAmount = (amount) =>
          !!amount
          && /^[0-9]{1,3}((\.[0-9]{3})+)?\,[0-9]{2}$/.test(amount)
          && parseInt(amount.replace(/\.|,/g, '')) > 0;

  const isValidDescription = (description) => !!description && !/^(\s)+$/.test(description);

  const register = (card, transaction) => {
    if (!validate(card, transaction)) throw new exceptions.InvalidTransactionData();

    let amountInfo = applyFeeTax(transaction.type, Dinero({ amount: transaction.amount.replace(/\.|,/g, ''), currency: 'BRL' }));

    return new Promise((resolve, reject) => {

      transactionRepository.create({
        type: transaction.type,
        net: amountInfo.net,
        gross: amountInfo.gross,
        commission: amountInfo.commission,
        description: transaction.description,
        cardNumber: hideCardNumber(card.cardNumber)
      })
      .then(transactionRepository.getAll())
      .then(resolve)
      .catch(reject);
    });

  };

  return {
    register,
    validate
  };
};
