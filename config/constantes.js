'use strict';

var path = require('path');
var rootPath = path.normalize(`${__dirname}/..`);

const PAYMENT_OPTION = 'Realizar Pagamento';
const BALANCE_OPTION = 'Consultar Saldo';
const SERVICE_TYPES_OPTIONS = [PAYMENT_OPTION, BALANCE_OPTION];

const DEBIT_CARD = 'Débito';
const CREDIT_CARD = 'Crédito';
const TRANSACTION_TYPE_OPTIONS = [DEBIT_CARD, CREDIT_CARD];

const CONFIRM = 'Sim';
const REFUSE = 'Não';
const RESTART = 'Voltar Ao Menu Inicial';
const CONFIRM_OPTIONS = [CONFIRM, REFUSE, RESTART];

const DEBIT_TAX = 3;
const CREDIT_TAX = 5;

const CREDIT_DELAY_PAYMENT_DAYS = 30;

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
  PAYMENT_SATUS: {
    PAID: 'paid',
    WAITING_FUNDS: 'waiting_funds'
  },
  CREDIT_DELAY_PAYMENT_DAYS,
  PATH: {
    ROOT: rootPath,
    CONSOLE: path.normalize(`${rootPath}/app/console`),
    CORE: path.normalize(`${rootPath}/app/core`),
    INFRASTRUCTURE: path.normalize(`${rootPath}/app/infrastructure`),
    TEST: path.normalize(`${rootPath}/test`)
  },
  REGEX: {
   VALID_CARD_NUMBER: /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
   VALID_CVV: /^[0-9]{3}$/,
   VALID_OWNERNAME: /[0-9]/,
   NOT_NUMBER_VALUE_IN_AMOUT: /(\.|,)|(\s)|([^0-9])/g,
   VALID_AMOUNTSTRING_2DECPRECISION: /^[0-9]{1,3}((\.[0-9]{3})+)?\,[0-9]{2}$/,
   EMPTY_SPACE: /^(\s)+$/
  }
}

module.exports = constantes;
