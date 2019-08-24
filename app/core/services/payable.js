'use strict';

const { constantes } = require('../../../config/util');

let payableRepository;

module.exports = (unitOfWork) => {

  payableRepository = unitOfWork.getRepository('payable');

  const register = (card, transaction) => {

  };

  return {
    register
  };
};
