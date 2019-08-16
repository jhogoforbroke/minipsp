'use strict';

var path = require('path');
var rootPath = path.normalize(`${__dirname}/..`);

const contantes = {
  PATH: {
    ROOT: rootPath,
    API: path.normalize(`${rootPath}/app/api`),
    CORE: path.normalize(`${rootPath}/app/core`),
    INFRASTRUCTURE: path.normalize(`${rootPath}/app/infrastructure`),
    TEST: path.normalize(`${rootPath}/test`)
  }
}

module.exports = contantes;
