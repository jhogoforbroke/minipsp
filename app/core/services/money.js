'use strict';

const { constantes } = require('../../../config/util');

module.exports = () => {

  const isFloat = (value) => value % 1 > 0;

  const toInteger = (value) => {
    if (typeof value === 'string')
      return parseInt(value.replace(constantes.REGEX.NOT_NUMBER_VALUE_IN_AMOUT, ''));

    if (isFloat(value))
      return parseInt(value*100);

    return value;
  };

  return {
    toInteger
  };
};
