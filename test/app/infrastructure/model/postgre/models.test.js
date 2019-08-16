'use strict';

const { config, contantes } = require('../../../../../config/util');

const path = require('path');

const sinon  = require('sinon');
const { expect } = require('chai');

const Sequelize = require(`${contantes.PATH.TEST}/mocks/Sequelize`);
let importStub = sinon.stub(Sequelize.prototype, 'import').callsFake((file) => path.parse(file));
let syncStub = sinon.stub(Sequelize.prototype, 'sync').callsFake(() => {});

let models;

describe('postgre models', () => {

  beforeEach(() => {
    models = require(`${contantes.PATH.INFRASTRUCTURE}/model/postgre`)(config, Sequelize);
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
