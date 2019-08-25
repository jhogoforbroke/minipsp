'use strict';

const { constantes } = require('../../../../config/util');

var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {

  var transaction = sequelize.define('transaction', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    type: {
      type: DataTypes.ENUM,
      values: constantes.TRANSACTION_TYPE_OPTIONS,
      allowNull: false
    },
    net: {
      type: DataTypes.FLOAT(2),
      allowNull: false
    },
    gross: {
      type: DataTypes.FLOAT(2),
      allowNull: false
    },
    commission: {
      type: DataTypes.FLOAT(2),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return transaction;
};
