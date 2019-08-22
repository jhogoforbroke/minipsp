"use strict";

const { config, constantes, exceptions } = require('../../../../config/util');

const sinon  = require('sinon');
const { expect } = require('chai');

let unitOfWork

unitOfWork = require(`${constantes.PATH.TEST}/mocks/unitOfWork`);

let cardService;

describe('cardService', () => {

  beforeEach(() => {
    cardService = require(`${constantes.PATH.CORE}/services/card`)(unitOfWork);
  })

  it('should hide the card number', () => {
    var ret = cardService.hideCardNumber('1111111111111111');
    expect(ret).to.deep.equal('XXXX-XXXX-XXXX-1111');
  });

  describe('When validate card', () => {

    let dateOneYearInFuture = new Date((new Date()).setFullYear(new Date().getFullYear()+1));

    let card = {
      cardNumber: '1111111111111111',
      ownerName: 'Tonny Stark',
      validate: dateOneYearInFuture,
    };

    describe('And cardNumber is undefined', () => {
      it('should invalidate card', () => {
        card.cardNumber = '';
        expect(cardService.isValid(card)).to.not.be.true;
      });
    });

    it('SHOULD IMPLEMENT', () => {
      throw new Error('SHOULD IMPLEMENT');
    });


  });

});
