"use strict";

const { constantes } = require('../../../config/util');

const chalk    = require('chalk');
const inquirer = require('inquirer');

inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'));

const cardNumberIsValid = (cardNumber) => constantes.REGEX.VALID_CARD_NUMBER.test(cardNumber);

const getNumber = () => {

  return new Promise((resolve, reject) => {

    inquirer.prompt([
      {
        type: 'string',
        name: 'cardNumber',
        message: 'Informe o numero do cartão (ex: 1111111111111111)',
        validate: (cardNumber) => cardNumberIsValid(cardNumber)
      }
    ])
    .then((answer) => resolve(answer.cardNumber));
  });
}

const getOwnerName = () => {

  return new Promise((resolve, reject) => {

    inquirer.prompt([
      {
        type: 'string',
        name: 'cardOwnerName',
        message: 'Informe o nome do dono do cartão, como impresso no cartão (ex: Anthony E Stark)',
        validate: (cardOwnerName) => !!cardOwnerName && !constantes.REGEX.INVALID_OWNERNAME.test(cardOwnerName)
      }
    ])
    .then((answer) => resolve(answer.cardOwnerName));
  });
};

const getValidate = () => {

  return new Promise((resolve, reject) => {

    inquirer.prompt([
      {
        type: 'datetime',
        name: 'cardValidate',
        message: 'Informe da data de validade (MM/YY)',
        format: ['mm', '/', 'yy'],
        validate: (cardValidate) => !!cardValidate && !!cardValidate > new Date()
      }
    ])
    .then((answer) => resolve(answer.cardValidate));
  });
};

const getCVV = () => {

  return new Promise((resolve, reject) => {

    inquirer.prompt([
      {
        type: 'string',
        name: 'cvv',
        message: 'Informe numero validador (CVV)',
        validate: (cvv) => !!cvv && !!constantes.REGEX.VALID_CVV.test(cvv)
      }
    ])
    .then((answer) => resolve(answer.cvv));
  });
};

const getCard = () => {

  let _card = {};

  return new Promise((resolve, reject) => {

    getNumber()
    .then((cardNumber) => {
      _card.cardNumber = cardNumber;
      return getOwnerName();
    })
    .then((ownerName) => {
      _card.ownerName = ownerName;
      return getValidate();
    })
    .then((validate) => {
      _card.validate = validate;
      return getCVV();
    })
    .then((cvv) => {
      _card.cvv = cvv;
      resolve(_card);
    });

  });
};

module.exports = { getCard, getCVV, getValidate, getOwnerName, getNumber };
