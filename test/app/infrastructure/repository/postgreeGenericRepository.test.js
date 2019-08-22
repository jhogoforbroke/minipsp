'use strict';

const { config, constantes } = require('../../../../config/util');

const sinon  = require('sinon');
const { expect } = require('chai');

const ENTITYNAME = 'someEntity';

const postgreModel = {};

let postgreeGenericRepository;

describe('postgreeGenericRepository', () => {

  beforeEach(() => {
    postgreeGenericRepository = require(`${constantes.PATH.INFRASTRUCTURE}/repository/postgreeGenericRepository`)(ENTITYNAME, postgreModel);
  });

  it('SHOULD IMPLEMENT', () => {
    throw new Error('SHOULD IMPLEMENT');
  });

});
