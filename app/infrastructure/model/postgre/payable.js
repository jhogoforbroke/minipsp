'use strict';

var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {

  var payable = sequelize.define('payable', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    }
  });

  return payable;
};
