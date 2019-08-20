"use strict";

const { config, contantes, exceptions } = require('../../../config/util');

const sinon  = require('sinon');
const { expect } = require('chai');

const FAKECORESERVICE = 'FAKECORESERVICE';

const core = { FAKECORESERVICE: () => {} };
let fakeServiceSpy = sinon.spy(core, 'FAKECORESERVICE');

const postgreModel = { connect: () => {} };
let connectStub = sinon.stub(postgreModel, 'connect').callsFake(() => {});

let postgreGenericRepositoryFake = sinon.fake();

let unitOfWork;

describe('unitOfWork', () => {

  describe('when initialized', () => {

    it('without config should throw a error message', () => {
      try {
        require(`${contantes.PATH.INFRASTRUCTURE}/unitOfWork`)(undefined, core, postgreModel)
      } catch (e) {
        expect(e).to.be.an.instanceof(exceptions.NoConfigError);
      }
    });

    it('without core should throw a error message', () => {
      try {
        require(`${contantes.PATH.INFRASTRUCTURE}/unitOfWork`)(config, undefined, postgreModel)
      } catch (e) {
        expect(e).to.be.an.instanceof(exceptions.NoCoreError);
      }
    });
  });

  beforeEach(() => {
    unitOfWork = require(`${contantes.PATH.INFRASTRUCTURE}/unitOfWork`)(config, core, postgreModel, postgreGenericRepositoryFake);
  });

  it('should connect to prostgree models', () => {
    unitOfWork.connect({ postgre: true });
    expect(connectStub.called).to.be.true;
  });

  it('should get core services', () => {
    unitOfWork.getService('FAKECORESERVICE');
    expect(fakeServiceSpy.called).to.be.true;
  });

  it('should get infrastructure repository', () => {
    unitOfWork.getRepository('SOMEREPO');
    expect(postgreGenericRepositoryFake.called).to.be.true;
    expect(postgreGenericRepositoryFake.args[0]).to.deep.equal([ 'SOMEREPO', postgreModel ]);
  });

});
