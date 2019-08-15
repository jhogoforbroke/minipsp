'use strict';

var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {

  var transaction = sequelize.define('transaction', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    }
  });

  return transaction;
};
