"use strict";

const { constantes } = require('../../../config/util');

const chalk    = require('chalk');
const inquirer = require('inquirer');

inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'));

const cardNumberIsValid = (cardNumber) => {
  return constantes.REGEX.VALID_CARD_NUMBER.test(cardNumber);
};

const getNumber = () => {

  return new Promise((resolve, reject) => {

    inquirer.prompt([
      {
        type: 'string',
        name: 'cardNumber',
        message: 'Informe o numero do cartão'
      }
    ])
    .then((answer) => {
      if (!cardNumberIsValid(answer.cardNumber)) {
        console.log(chalk.yellow('Numero inválido!'));
        return getNumber();
      }

      resolve(answer.cardNumber);
    });

  });

}

const getOwnerName = () => {

  return new Promise((resolve, reject) => {

    inquirer.prompt([
      {
        type: 'string',
        name: 'cardOwnerName',
        message: 'Informe o nome do dono do cartão'
      }
    ])
    .then((answer) => {
      if (!answer.cardOwnerName) {
        console.log(chalk.yellow('Nome inválido!'));
        return getName();
      }

      resolve(answer.cardOwnerName);
    });
  });
};

const getValidate = () => {

  return new Promise((resolve, reject) => {

    inquirer.prompt([
      {
        type: 'datetime',
        name: 'cardValidate',
        message: 'Informe da data de validade',
        format: ['mm', '/', 'yy']
      }
    ])
    .then((answer) => {
      console.log(answer.cardValidate);

      if (!answer.cardValidate) {
        console.log(chalk.yellow('Data Inválida!'));
        return getValidate();
      }

      resolve(answer.cardValidate);
    });
  });
};

const getCVV = () => {

  return new Promise((resolve, reject) => {

    inquirer.prompt([
      {
        type: 'string',
        name: 'cvv',
        message: 'Informe numero validador (CVV)'
      }
    ])
    .then((answer) => {

      if (!answer.cvv) {
        console.log(chalk.yellow('CVV invalido!'));
        return getCVV();
      }

      resolve(answer.cvv);
    });
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
