"use strict";

const { contantes } = require('../../../config/util');

const chalk    = require('chalk');
const inquirer = require('inquirer');

inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'));

const confirmTransaction = () => {

  return new Promise((resolve, reject) => {

    inquirer.prompt([
      {
        type: 'list',
        name: 'confirmTransaction',
        message: 'Confirma os dados da transação?',
        choices: contantes.CONFIRM_OPTIONS
      }
    ])
    .then((answer) => resolve(answer.confirmTransaction));
  });
};

const getAmount = () => {

  return new Promise((resolve, reject) => {

    inquirer.prompt([
      {
        type: 'number',
        name: 'amount',
        message: 'Qual valor da transação?'
      }
    ])
    .then((answer) => {

      if (!answer.amount) {
        console.log(chalk.yellow('Valor inválido, digite o valor novamente!'));
        return getAmount();
      }

      resolve(answer.amount);
    });
  });
};

const getDescription = () => {

  return new Promise((resolve, reject) => {

    inquirer.prompt([
      {
        type: 'string',
        name: 'description',
        message: 'Informa uma descrição para a transação'
      }
    ])
    .then((answer) => {

      if (!answer.description) {
        console.log(chalk.yellow('Valor inválido, digite o valor novamente!'));
        return getDescription();
      }

      resolve(answer.description);
    });

  });
};

const getTransactionType = () => {

  return new Promise((resolve, reject) => {

    inquirer.prompt([
      {
        type: 'list',
        name: 'transactionType',
        message: 'Qual tipo de transação?',
        choices: contantes.TRANSACTION_TYPE_OPTIONS
      }
    ])
    .then((answer) => {
      resolve(answer.transactionType);
    });
  });
};

const getTransaction = () => {

  var transaction = {};

  return new Promise((resolve, reject) => {

    getTransactionType()
    .then((type) => {
      transaction.type = type;
      return getAmount();
    })
    .then((amount) => {
      transaction.amount = amount;
      return getDescription();
    })
    .then((description) => {
      transaction.description = description;
      resolve(transaction);
    });
  });
};

module.exports = { getTransaction, getDescription, getAmount, getTransactionType, confirmTransaction };
