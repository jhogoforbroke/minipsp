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

module.exports = {
  NoConfigError,
  NoCoreError,
  UpdateWithoutWhereError
};
