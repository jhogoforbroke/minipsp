'use strict';

let fs,
    path,
    Sequelize,
    models = {};

fs = require('fs');
path = require('path');
Sequelize = require('sequelize');

const { Op } = Sequelize;

module.exports = (config, Sequelize = require('sequelize')) => {

  let sequelize = new Sequelize(config.db.postgre, {
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000,
      evict: 30000,
      handleDisconnects: true
    }
  });

  fs.readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach((file) => {
    let model = sequelize.import(path.join(__dirname, file));
    models[model.name] = model;
  });

  Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName])
      models[modelName].associate(models);
  });

  models.connect = () => sequelize.sync();

  return models;
};
