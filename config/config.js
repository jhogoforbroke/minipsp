'use strict';

let config,
    env;

env = process.env.ENV || 'develop';

config = {
  develop: {
    port: 9001,
    db: {
      postgre: 'postgres://wofhoxnd:7QPlPuSK35YuM0R34Mlvfz239ESLZ9_T@motty.db.elephantsql.com:5432/wofhoxnd',
    }
  },
  homolog: {},
  production: {}
};

config[env].contantes = require('./contantes');
config[env].exceptions = require('./exceptions');

module.exports = config[env];
