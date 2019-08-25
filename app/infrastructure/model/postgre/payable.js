'use strict';

const { constantes } = require('../../../../config/util');

var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {

  var payable = sequelize.define('payable', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    transactionId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    amount: {
      type: DataTypes.NUMBER(2),
      allowNull: false
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: [ constantes.PAYMENT_SATUS.PAID, constantes.PAYMENT_SATUS.WAITING_FUNDS ],
      allowNull: false
    }
  });

  payable.associate = (models) => {
    payable.belongsTo(models.transaction);
  };

  return payable;
};
