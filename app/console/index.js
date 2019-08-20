"use strict";

var unitOfWork,
    transactionService;

const { contantes, config } = require('../../config/util');

const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const inquirer    = require('inquirer');
const { Spinner } = require('clui');
const ProgressBar = require('progress');

inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'));

const menu = require('./menu');
const core = require(`${contantes.PATH.CORE}`);

const turnOn = () => {

  printHeader();

  unitOfWork = require(`${contantes.PATH.INFRASTRUCTURE}/unitOfWork`)(config, core);

  const connLoad = new Spinner('Iniciando...');
  connLoad.start();

  unitOfWork.connect({ postgre: true })
  .then(() => {

    connLoad.stop();

    transactionService = unitOfWork.getService('transaction');

    menu.main.init()
    .then((serviceType) => {

      switch (serviceType) {

        case contantes.PAYMENT_OPTION:
          startPaymentProcess();
          break;

        case contantes.BALANCE_OPTION:
          startBalanceProcess();
          break;

        default:
          break;
      }
    });
  });
};

const restart = () => {

  printHeader();

  menu.main.init()
  .then((serviceType) => {

    switch (serviceType) {

      case contantes.PAYMENT_OPTION:
        startPaymentProcess();
        break;

      case contantes.BALANCE_OPTION:
        startBalanceProcess();
        break;

      default:
        break;
    }
  });
};

const printHeader = () => {
  clear();

  console.log(chalk.yellow(figlet.textSync('MiniPSP', {
      horizontalLayout: 'default',
      verticalLayout: 'default'
  })));
  console.log(chalk.yellow('.: Serviço provedor de pagamentos! :.'));
};

const startPaymentProcess = () => {

  let transactionData, cardData;

  menu.transaction.getTransaction()
  .then((t) => {
    transactionData = t;

    return menu.card.getCard();
  })
  .then((c) => {
    cardData = c;

    return menu.transaction.confirmTransaction();
  })
  .then((confirmOption) => {

    switch (confirmOption) {
      case contantes.CONFIRM:
        applyTransaction(cardData, transactionData);
        break;

      case contantes.REFUSE:
        startPaymentProcess();
        break;

      case contantes.RESTART:
        restart();
        break;
    }
  })
  .catch(console.log(chalk.red('Erro ao executar transação!', err)));
};

const applyTransaction = (cardData, transactionData) => {

  transactionService.execute(cardData, transactionData);
  .then(() => {
    
  })
  .catch(console.log(chalk.red('Erro ao executar transação!', err)));
};

const startBalanceProcess = () => {
  
};

module.exports = { turnOn, restart };
