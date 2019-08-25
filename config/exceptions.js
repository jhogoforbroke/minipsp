'use strict';

class NoConfigError extends Error {
  constructor(){
    super('No config could be found... Can you inform the config object?');
    this.name = 'NoConfigError'
  }
};

class NoCoreError extends Error {
  constructor(){
    super('No core could be found... Can you inform the core object?');
    this.name = 'NoCoreError'
  }
};

class UpdateWithoutWhereError extends Error {
  constructor(){
    super('Update needs where!');
    this.name = 'UpdateWithoutWhereError'
  }
};

class InvalidTransactionData extends Error {
  constructor(){
    super('Invalid transaction data!');
    this.name = 'InvalidTransactionData'
  }
};

class InvalidPaymentDate extends Error {
  constructor(){
    super('Invalid payment date!');
    this.name = 'InvalidPaymentDate'
  }
};

module.exports = {
  NoConfigError,
  NoCoreError,
  UpdateWithoutWhereError,
  InvalidTransactionData,
  InvalidPaymentDate
};
