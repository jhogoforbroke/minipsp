'use strict';

const { constantes, exceptions } = require('../../../config/util');

let moment = require('moment');

let payableRepository,
    transactionRepository;

module.exports = (unitOfWork) => {

  payableRepository = unitOfWork.getRepository('payable');
  transactionRepository = unitOfWork.getRepository('transaction');

  const definePayday = (transactionType) => {

    switch (transactionType) {
      case constantes.DEBIT_CARD:
        return defineDebitPayday();
        break;

      case constantes.CREDIT_CARD:
        return defineCreditPayday();
        break;
    }

    throw new exceptions.InvalidPaymentDate();
  };

  const defineDebitPayday = () => {
    return new Date(moment().format());
  };

  const defineCreditPayday = () => {
    return new Date(moment().add(constantes.CREDIT_DELAY_PAYMENT_DAYS, 'day').format());
  };

  const definePaymentStatus = (paymentDate) => {
    let paymentHasAlreadyOccurred = moment(paymentDate) <= moment();

    if (paymentHasAlreadyOccurred)
      return constantes.PAYMENT_SATUS.PAID;

    return constantes.PAYMENT_SATUS.WAITING_FUNDS;
  };

  const isTransactionValidToCreatePayble = (transaction) =>
            !!transaction && !!transaction.id && transaction.net > 0;

  const register = (transaction) => {

    if (!isTransactionValidToCreatePayble(transaction))
      throw new exceptions.InvalidTransactionData();

    let paymentDate = definePayday(transaction.type);
    let status = definePaymentStatus(paymentDate);

    return payableRepository.create({
      transactionId: transaction.id,
      amount: transaction.net,
      paymentDate,
      status
    });
  };

  const payables = () => {

    return new Promise((resolve, reject) => {

      let payables, transactions;

      payableRepository.getAll()
      .then((p) => {
        payables = p;
        return transactionRepository.getAll({ id: payables.map(x => x.transactionId) })
      })
      .then((t) => {
        transactions = t;
        payables.forEach(x => x.transaction = transactions.find(y => y.id === x.transactionId));

        resolve(payables);
      });
    });
  };

  return {
    register,
    payables
  };
};
