'use strict';

const { config, contantes } = require('../../../../config/util');

const sinon  = require('sinon');
const { expect } = require('chai');

const ENTITYNAME = 'someEntity';

const postgreModel = {};

let postgreeGenericRepository;

describe('postgreeGenericRepository', () => {

  beforeEach(() => {
    postgreeGenericRepository = require(`${contantes.PATH.INFRASTRUCTURE}/repository/postgreeGenericRepository`)(ENTITYNAME, postgreModel);
  });

  it('description', () => {
    throw new Error('SHOULD IMPLEMENT');
  });

});
