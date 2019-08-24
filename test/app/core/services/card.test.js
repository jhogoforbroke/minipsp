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
    let ret = cardService.hideCardNumber('1111111111111111');
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

    describe('And the number of digits of cardNumber is invalid', () => {
      it('should invalidate card', () => {
        card.cardNumber = '01234567890';
        expect(cardService.isValid(card)).to.not.be.true;

        card.cardNumber = '01234567891234567';
        expect(cardService.isValid(card)).to.not.be.true;
      });
    });

    describe('And the cardNumber not only have digits', () => {
      it('should invalidate card', () => {
        card.cardNumber = 'A111222233334444';
        expect(cardService.isValid(card)).to.not.be.true;
      });
    });

    describe('And the cvv length is not 3', () => {
      it('should invalidate card', () => {
        card.cvv = '12';
        expect(cardService.isValid(card)).to.not.be.true;

        card.cvv = '1234';
        expect(cardService.isValid(card)).to.not.be.true;
      });
    });

    describe('And the cvv not only have digits', () => {
      it('should invalidate card', () => {
        card.cardNumber = 'ABC';
        expect(cardService.isValid(card)).to.not.be.true;
      });
    });

    describe('And the ownerName have digits', () => {
      it('should invalidate card', () => {
        card.cardNumber = 'J08N STR33t';
        expect(cardService.isValid(card)).to.not.be.true;
      });
    });

    describe('And the validate was expired', () => {
      it('should invalidate card', () => {
        let YESTERDAY = new Date(new Date().setDate(new Date().getDate() - 1));
        card.validate = YESTERDAY;
        expect(cardService.isValid(card)).to.not.be.true;
      });
    });
  });

});
