'use strict';

let _config,
    _core,
    _postgreModels,
    _postgreGenericRepository;

const { constantes, exceptions } = require('../../config/util');

module.exports = (config, core, postgreModels, postgreGenericRepository) => {

  if (!config) throw new exceptions.NoConfigError();
  if (!core) throw new exceptions.NoCoreError();

  _config = config;
  _core = core;

  _postgreModels = postgreModels || require(`${constantes.PATH.INFRASTRUCTURE}/model/postgre`)(config);
  _postgreGenericRepository = postgreGenericRepository || require(`${constantes.PATH.INFRASTRUCTURE}/repository/postgreeGenericRepository`);

  const connect = (options) => {

    let connProms = [];

    if(!!options.postgre)
      connProms.push(_postgreModels.connect());

    return Promise.all(connProms);
  };

  const getService = (serviceName) => _core[serviceName](this);
  const getRepository = (entityName) => _postgreGenericRepository(entityName, _postgreModels);

  return {
    connect,
    getRepository,
    getService
  };
}
