'use strict';

const path = require('path');

const sinon  = require('sinon');
const { expect } = require('chai');

const basePath = path.normalize('../../../../app');
const config = { db: { postgree:'MOCKCONNECTIONSTRING' } };

const Sequelize = require('../../../mocks/Sequelize');
let importStub = sinon.stub(Sequelize.prototype, 'import').callsFake((file) => path.parse(file));
let syncStub = sinon.stub(Sequelize.prototype, 'sync').callsFake(() => {});

let models;

describe('models', () => {

  beforeEach(() => {
    models = require(`${basePath}/infrastructure/model`)(config, Sequelize);
  });

  it('should import models', () => {
    expect(importStub.called).to.be.true;
  });

  it('should have a transactions model', () => {
    expect(models.transaction).to.not.be.undefined;
  });

  it('should have a payables model', () => {
    expect(models.payable).to.not.be.undefined;
  });

  describe('when conect', () => {
    beforeEach(() => {
      models.connect();
    });

    it('should sync Sequelize', () => {
      expect(syncStub.called).to.be.true;
    });
  });

});
