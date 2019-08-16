'use strict';

var mysqlGenericRepository = function (entityName, modelBase) {

  // var _modelBase = modelBase;
  // var model = _modelBase[entityName];
  //
  // Op = _modelBase.Sequelize.Op
  // var $between = Op.between;
  // var $in = Op.in;
  //
  // var _fillDateRanges = function (where) {
  //   if (!!where.DATERANGE && where.DATERANGE === 'TODAY') {
  //     var start = new Date();
  //     start.setHours(0, 0, 0, 0);
  //
  //     var end = new Date();
  //     end.setHours(23, 59, 59, 999);
  //
  //
  //     where.createdAt = {
  //       $between: [start, end]
  //     };
  //
  //     delete where.DATERANGE;
  //   }
  // }
  //
  // return {
  //   getAll: function (where) {
  //     return !!where
  //       ? model.findAll({
  //         where: where
  //       })
  //       : model.findAll();
  //   },
  //
  //   getOne: function (where) {
  //
  //     _fillDateRanges(where);
  //
  //     return model.findOne({
  //       where: where
  //     });
  //   },
  //
  //   last: function (where, param) {
  //     var defer = q.defer();
  //     var param = param || 'createdAt';
  //     model.findAll({
  //       limit: 1,
  //       where: where,
  //       order: [[param, 'DESC']]
  //     })
  //       .then(function (finded) {
  //         defer.resolve(finded[0]);
  //       });
  //     return defer.promise;
  //   },
  //
  //   delete: function (id) {
  //     id = Array.isArray(id) ? id : [id];
  //     return model.destroy({
  //       where: {
  //         id: id
  //       }
  //     });
  //   },
  //
  //   deleteWhere: function (where) {
  //     return model.destroy({ where });
  //   },
  //
  //   update: function (where, data) {
  //
  //     _fillDateRanges(where);
  //
  //     if (!where) {
  //       throw new Error('update needs where');
  //       return;
  //     }
  //     return model.update(data, {
  //       where: where
  //     });
  //   },
  //
  //   create: function (data) {
  //     if (Array.isArray(data))
  //       return model.bulkCreate(data);
  //     else
  //       return model.create(data);
  //   },
  //
  //   count: function (where) {
  //
  //     _fillDateRanges(where);
  //
  //     return model.count({
  //       where: where
  //     });
  //   },
  //
  //   rawQuery: function (query) {
  //     return _modelBase.sequelize.query(query, { model: model });
  //   }
  // }
};

module.exports = mysqlGenericRepository;
