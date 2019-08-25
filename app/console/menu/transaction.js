"use strict";

const { constantes } = require('../../../config/util');

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
        choices: constantes.CONFIRM_OPTIONS
      }
    ])
    .then((answer) => resolve(answer.confirmTransaction));
  });
};

const getValue = (resolve) => {

  return new Promise((resolve, reject) => {

    inquirer.prompt([
      {
        type: 'string',
        name: 'amount',
        message: 'Qual valor da transação? (ex: 1,99)',
        validate: (amount) => !!amount && !!/^[0-9]{1,3}((\.[0-9]{3})+)?\,[0-9]{2}$/.test(amount)
      }
    ])
    .then((answer) => resolve(answer.amount));
  });
};

const getDescription = () => {

  return new Promise((resolve, reject) => {

    inquirer.prompt([
      {
        type: 'string',
        name: 'description',
        message: 'Informa uma descrição para a transação',
        validate: (description) => !!description
      }
    ])
    .then((answer) => resolve(answer.description));
  });
};

const getTransactionType = () => {

  return new Promise((resolve, reject) => {

    inquirer.prompt([
      {
        type: 'list',
        name: 'transactionType',
        message: 'Qual tipo de transação?',
        choices: constantes.TRANSACTION_TYPE_OPTIONS
      }
    ])
    .then((answer) => resolve(answer.transactionType));
  });
};

const getTransaction = () => {

  var transaction = {};

  return new Promise((resolve, reject) => {

    getTransactionType()
    .then((type) => {
      transaction.type = type;
      return getValue();
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

module.exports = { getTransaction, getDescription, getValue, getTransactionType, confirmTransaction };
