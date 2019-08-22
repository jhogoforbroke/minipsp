'use strict';

var path = require('path');
var rootPath = path.normalize(`${__dirname}/..`);

const PAYMENT_OPTION = 'Realizar Pagamento';
const BALANCE_OPTION = 'Consultar Saldo';
const SERVICE_TYPES_OPTIONS = [PAYMENT_OPTION, BALANCE_OPTION];

const DEBIT_CARD = 'Crédito';
const CREDIT_CARD = 'Débito';
const TRANSACTION_TYPE_OPTIONS = [DEBIT_CARD, CREDIT_CARD];

const CONFIRM = 'Crédito';
const REFUSE = 'Débito';
const RESTART = 'Débito';
const CONFIRM_OPTIONS = [CONFIRM, REFUSE, RESTART];

const DEBIT_TAX = 3;
const CREDIT_TAX = 5;

const constantes = {
  PAYMENT_OPTION,
  BALANCE_OPTION,
  SERVICE_TYPES_OPTIONS,
  DEBIT_CARD,
  CREDIT_CARD,
  TRANSACTION_TYPE_OPTIONS,
  CONFIRM,
  REFUSE,
  RESTART,
  CONFIRM_OPTIONS,
  DEBIT_TAX,
  CREDIT_TAX,
  PATH: {
    ROOT: rootPath,
    CONSOLE: path.normalize(`${rootPath}/app/console`),
    CORE: path.normalize(`${rootPath}/app/core`),
    INFRASTRUCTURE: path.normalize(`${rootPath}/app/infrastructure`),
    TEST: path.normalize(`${rootPath}/test`)
  }
}

module.exports = constantes;
