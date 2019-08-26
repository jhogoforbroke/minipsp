'use strict';

const { exceptions } = require('../../../config/util');

const mysqlGenericRepository = (entityName, models) => {

  let model = models[entityName];

  return {
    getAll: (where) => {
      return !!where
        ? model.findAll({
          where: where,
        })
        : model.findAll();
    },

    getOne: (where) => {
      return model.findOne({
        where: where
      });
    },

    delete: (where) => {
      return model.destroy({ where });
    },

    update: (where, data) => {
      if (!where) {
        throw new exceptions.UpdateWithoutWhereError();
        return;
      }
      return model.update(data, {
        where: where
      });
    },

    create:(data) => {
      if (Array.isArray(data))
        return model.bulkCreate(data);
      else
        return model.create(data);
    },

    count: (where) => {
      return model.count({
        where: where
      });
    }
  }
};

module.exports = mysqlGenericRepository;
