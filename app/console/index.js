"use strict";

var unitOfWork,
    transactionService,
    payableService;

const { constantes, config } = require('../../config/util');

const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const inquirer    = require('inquirer');
const { Spinner } = require('clui');
const ProgressBar = require('progress');
const prettyjson  = require('prettyjson');

inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'));

const menu = require('./menu');
const core = require(`${constantes.PATH.CORE}`);

const turnOn = () => {

  clear();
  printHeader();

  unitOfWork = require(`${constantes.PATH.INFRASTRUCTURE}/unitOfWork`)(config, core);

  const connLoad = new Spinner('Iniciando...');
  connLoad.start();

  unitOfWork.connect({ postgre: true })
  .then(() => {

    connLoad.stop();

    transactionService = unitOfWork.getService('transaction');
    payableService = unitOfWork.getService('payable');

    menu.main.init()
    .then((serviceType) => {

      switch (serviceType) {

        case constantes.PAYMENT_OPTION:
          startPaymentProcess();
          break;

        case constantes.BALANCE_OPTION:
          startBalanceProcess();
          break;

        default:
          break;
      }
    });
  })
  .catch((err) => console.log(chalk.red('Erro ao executar transação!', err)));
};

const restart = () => {

  printHeader();

  menu.main.init()
  .then((serviceType) => {

    switch (serviceType) {

      case constantes.PAYMENT_OPTION:
        startPaymentProcess();
        break;

      case constantes.BALANCE_OPTION:
        startBalanceProcess();
        break;

      default:
        break;
    }
  });
};

const printHeader = () => {

  console.log(chalk.yellow(figlet.textSync('MiniPSP', {
      horizontalLayout: 'default',
      verticalLayout: 'default'
  })));
  console.log(chalk.yellow('.: Serviço provedor de pagamentos! :.'));
};

const startPaymentProcess = () => {

  let transaction, card;

  menu.transaction.getTransaction()
  .then((t) => {
    transaction = t;

    return menu.card.getCard();
  })
  .then((c) => {
    card = c;

    return menu.transaction.confirmTransaction();
  })
  .then((confirmOption) => {

    switch (confirmOption) {
      case constantes.CONFIRM:
        applyTransaction(card, transaction);
        break;

      case constantes.REFUSE:
        startPaymentProcess();
        break;

      case constantes.RESTART:
        restart();
        break;
    }
  })
  .catch((err) => console.log(chalk.red('Erro ao executar transação!', err)));
};

const printLastTransactions = (transactions) => {
  if (!transactions || transactions.length === 0)
    return console.log(chalk.yellow('Sem transações registradas!'));

  transactions
  .sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt))) //Order DESC by CreatedAt
  .slice(0, 5) // Show Last 5
  .forEach(t => {

    console.log(chalk.green('============'));

    console.log(prettyjson.render({
      'Transação': t.id,
      'Tipo': t.type,
      'Valor': t.gross,
      'Descrição': t.description,
      'Cartão': t.cardNumber,
      'Data': t.createdAt
    }))

    console.log(chalk.green('============'));

  });
};

const printPayablesBalance = (payables) => {

  let paidPayables = [],
      waitingFundsPayables = [];

  payables.forEach((payable) => {
    if (payable.paymentDate <= new Date())
      return paidPayables.push(payable);

    if (payable.paymentDate > new Date())
      waitingFundsPayables.push(payable);
  });

  console.log();
  console.log(chalk.green('=== Recebidas ==='));
  paidPayables.forEach((paidPayable) => {

    console.log(prettyjson.render({
      'Data': paidPayable.paymentDate,
      'Valor': paidPayable.amount,
      'Descrição': paidPayable.transaction.description,
      'Tipo': paidPayable.transaction.type
    }))

    console.log(chalk.green(new inquirer.Separator()));
  });

  console.log();

  console.log(chalk.green('=== À Receber ==='));
  waitingFundsPayables.forEach((waitingFundsPayable) => {

    console.log(prettyjson.render({
      'Data': waitingFundsPayable.paymentDate,
      'Valor': waitingFundsPayable.amount,
      'Descrição': waitingFundsPayable.transaction.description,
      'Tipo': waitingFundsPayable.transaction.type
    }))

    console.log(chalk.green(new inquirer.Separator()));
  });

  console.log();
};

const applyTransaction = (card, transaction) => {

  transactionService.execute(card, transaction)
  .then((transactions) => {
    console.log(chalk.green('Transação concluida com sucesso!'));
    printLastTransactions(transactions);
    restart();
  })
  .catch((err) => console.log(chalk.red('Erro ao executar transação!', err)));
};

const startBalanceProcess = () => {
  payableService.payables()
  .then((payables) => {
    printPayablesBalance(payables);

    restart();
  })
  .catch((err) => console.log(chalk.red('Erro ao buscar saldo!', err)));
};

module.exports = { turnOn, restart };
