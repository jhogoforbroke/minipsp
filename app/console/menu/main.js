"use strict";

const { constantes } = require('../../../config/util');

const chalk    = require('chalk');
const inquirer = require('inquirer');

const init = () => {

  return new Promise((resolve, reject) => {

    inquirer.prompt([
      {
        type: 'list',
        name: 'serviceType',
        message: 'O que gostaria de fazer?',
        choices: constantes.SERVICE_TYPES_OPTIONS
      }
    ])
    .then((answer) => {
      resolve(answer.serviceType);
    });
  });
};

module.exports = { init };
