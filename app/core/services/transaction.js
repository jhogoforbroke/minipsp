'use strict';

const { contantes } = require('../../config/util');

module.exports = (unitOfWork) => {

  transactionRepository = unitOfWork.getRepository('transaction');
  payableRepository = unitOfWork.getRepository('payable');

  const validate = (card, transaction) => {
    
  };

  const execute = (card, transaction) => {
    
  };

  return {
    execute
  };
};
