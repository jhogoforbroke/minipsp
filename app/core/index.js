'use strict';

const { constantes } = require('../../config/util');

const fs = require('fs');
const path = require('path');

var _exports = {};

const readModuleFilesSync = (dir) =>
  fs.readdirSync(dir).reduce((files, file) =>
    fs.statSync(path.join(dir, file)).isDirectory()
      ? files.concat(readModuleFilesSync(path.join(dir, file)))
      : files.concat(path.join(dir, file)),
    []);

readModuleFilesSync(`${constantes.PATH.CORE}/services`)
.forEach((file) => {
  file = file.substr(0, file.length-3);
  let serviceName = file.substr(file.lastIndexOf('/')+1, file.length);
  let service = (unitOfWork) => { return require(file)(unitOfWork) };
  _exports[serviceName] = service;
});

module.exports =  _exports;
