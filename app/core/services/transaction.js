'use strict';

const { constantes } = require('../../../config/util');

let transactionRepository,
    feeService,
    cardService,
    moneyService,
    payableService;

module.exports = (unitOfWork) => {

  transactionRepository = unitOfWork.getRepository('transaction');

  feeService = unitOfWork.getService('fee');
  cardService = unitOfWork.getService('card');
  moneyService = unitOfWork.getService('money');
  payableService = unitOfWork.getService('payable');

  const validate = (card, transaction) =>
          cardService.isValid(card)
          && isValidType(transaction.type)
          && isValidAmount(transaction.amount)
          && isValidDescription(transaction.description);

  const isValidType = (type) => !!type && constantes.TRANSACTION_TYPE_OPTIONS.includes(type);

  const isValidAmount = (amount) =>
          !!amount
          && constantes.REGEX.VALID_AMOUNTSTRING_2DECPRECISION.test(amount)
          && moneyService.toInteger(amount) > 0;

  const isValidDescription = (description) => !!description && !constantes.REGEX.EMPTY_SPACE.test(description);

  const register = (card, transaction) => {

    if (!validate(card, transaction)) throw new exceptions.InvalidTransactionData();

    let payableAmount = feeService.applyFeeTax(transaction.type, moneyService.toInteger(transaction.amount));

    return transactionRepository.create({
      type: transaction.type,
      net: payableAmount.net,
      gross: payableAmount.gross,
      commission: payableAmount.commission,
      description: transaction.description,
      cardNumber: cardService.hideCardNumber(card.cardNumber)
    });
  };

  const execute = (card, transaction) => {

    return new Promise((resolve, reject) => {

      register(card, transaction)
      .then(payableService.register)
      .then(transactionRepository.getAll)
      .then(resolve)
      .catch(reject);
    });
  }

  return {
    execute,
    register,
    validate
  };
};
