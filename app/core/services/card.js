'use strict';

const { constantes } = require('../../../config/util');

module.exports = (unitOfWork) => {

  const isValidNumber = (cardNumber) =>
          !!cardNumber
          && typeof cardNumber === 'string'
          && cardNumber.length === 16
          && /^[0-9]{16}$/.test(cardNumber);

  const isValidCVV = (cvv) =>
          !!cvv
          && typeof cvv === 'string'
          && cvv.length === 3
          && /^[0-9]{3}$/.test(cvv);

  const isValidOwnerName = (ownerName) =>
          !!ownerName
          && typeof ownerName === 'string'
          && !/[0-9]/.test(ownerName);

  const isValidValidate = (validate) =>
          !!validate
          && typeof validate.getYear === 'function'
          && validate > new Date();

  const isValid = (card) =>
          isValidNumber(card.cardNumber)
          && isValidCVV(card.cvv)
          && isValidOwnerName(card.ownerName)
          && isValidValidate(card.validate);

  const hideCardNumber = (cardNumber) => {
    return `XXXX-XXXX-XXXX-${cardNumber.substr(12, 5)}`;
  };

  return {
    isValid,
    hideCardNumber
  };
};

