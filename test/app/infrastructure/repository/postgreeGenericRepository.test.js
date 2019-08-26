'use strict';

const { config, constantes } = require('../../../../config/util');

const sinon  = require('sinon');
const { expect } = require('chai');

const ENTITYNAME = 'someEntity';

const postgreModel = {
  [ENTITYNAME]: {
    findAll: () => {},
    findOne: () => {},
    destroy: () => {},
    create: () => {},
    update: () => {},
    count: () => {}
  }
};

let findAllSpy,
    findOneSpy,
    destroySpy,
    createSpy,
    updateSpy,
    countSpy;

let postgreeGenericRepository;

describe('postgreeGenericRepository', () => {

  beforeEach(() => {
    findAllSpy = sinon.spy(postgreModel[ENTITYNAME], 'findAll');
    findOneSpy = sinon.spy(postgreModel[ENTITYNAME], 'findOne');
    destroySpy = sinon.spy(postgreModel[ENTITYNAME], 'destroy');
    createSpy = sinon.spy(postgreModel[ENTITYNAME], 'create');
    updateSpy = sinon.spy(postgreModel[ENTITYNAME], 'update');
    countSpy = sinon.spy(postgreModel[ENTITYNAME], 'count');

    postgreeGenericRepository = require(`${constantes.PATH.INFRASTRUCTURE}/repository/postgreeGenericRepository`)(ENTITYNAME, postgreModel);
  });

  afterEach(() => {
    findAllSpy.restore();
    findOneSpy.restore();
    destroySpy.restore();
    createSpy.restore();
    updateSpy.restore();
    countSpy.restore();
  });

  describe('When perform getAll entitie', () => {

    beforeEach(() => {
      postgreeGenericRepository.getAll();
    });

    it('Should model findAll', () => {
      expect(findAllSpy.called).to.be.true;
    });
  });

  describe('When perform getOne entitie', () => {

    beforeEach(() => {
      postgreeGenericRepository.getOne({ id: 1 });
    });

    it('Should model findOne', () => {
      expect(findOneSpy.called).to.be.true;
    });
  });

  describe('When perform delete entitie', () => {

    beforeEach(() => {
      postgreeGenericRepository.delete({ id: 1 });
    });

    it('Should model destroy', () => {
      expect(destroySpy.called).to.be.true;
    });
  });

  describe('When perform update entitie', () => {

    beforeEach(() => {
      postgreeGenericRepository.update({ id: 1 }, { name: 'someName' });
    });

    it('Should model update', () => {
      expect(updateSpy.called).to.be.true;
    });
  });

  describe('When perform create entitie', () => {

    beforeEach(() => {
      postgreeGenericRepository.create({ id: 1, name: 'someName' });
    });

    it('Should model create', () => {
      expect(createSpy.called).to.be.true;
    });
  });

  describe('When perform create entitie', () => {

    beforeEach(() => {
      postgreeGenericRepository.create({ id: 1, name: 'someName' });
    });

    it('Should model create', () => {
      expect(createSpy.called).to.be.true;
    });
  });

  describe('When perform count entitie', () => {

    beforeEach(() => {
      postgreeGenericRepository.count({ name: 'someName' });
    });

    it('Should model count', () => {
      expect(countSpy.called).to.be.true;
    });
  });

});
