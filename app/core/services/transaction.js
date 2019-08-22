'use strict';

const { constantes } = require('../../../config/util');

let transactionRepository,
    payableRepository,
    feeService,
    cardService,
    moneyService;

module.exports = (unitOfWork) => {

  transactionRepository = unitOfWork.getRepository('transaction');
  payableRepository = unitOfWork.getRepository('payable');

  feeService = unitOfWork.getService('fee');
  cardService = unitOfWork.getService('card');
  moneyService = unitOfWork.getService('money');

  const validate = (card, transaction) =>
          cardService.isValid(card)
          && isValidType(transaction.type)
          && isValidAmount(transaction.amount)
          && isValidDescription(transaction.description);

  const isValidType = (type) => !!type && constantes.TRANSACTION_TYPE_OPTIONS.includes(type);

  const isValidAmount = (amount) =>
          !!amount
          && /^[0-9]{1,3}((\.[0-9]{3})+)?\,[0-9]{2}$/.test(amount)
          && moneyService.toInteger(amount) > 0;

  const isValidDescription = (description) => !!description && !/^(\s)+$/.test(description);

  const register = (card, transaction) => {

    if (!validate(card, transaction)) throw new exceptions.InvalidTransactionData();

    let amountInfo = feeService.applyFeeTax(transaction.type, moneyService.toInteger(transaction.amount));

    return new Promise((resolve, reject) => {

      transactionRepository.create({
        type: transaction.type,
        net: amountInfo.net,
        gross: amountInfo.gross,
        commission: amountInfo.commission,
        description: transaction.description,
        cardNumber: cardService.hideCardNumber(card.cardNumber)
      })
      // .then(payableService.register())
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
