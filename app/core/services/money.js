'use strict';

const { constantes } = require('../../../config/util');

module.exports = () => {

  const isFloat (value) => value % 1 > 0;

  const toInteger = (value) => {
    if (typeof value === 'string')
      return parseInt(value.replace(/(\.|,)|(\s)|([^0-9])/g, ''));

    if (isFloat(value))
      return parseInt(value*100);

    return value;
  };

  return {
    toInteger
  };
};
