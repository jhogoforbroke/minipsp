#!/usr/bin/env node

"use strict";

const { constantes } = require('./config/util');

const miniPSPconsole = require(`${constantes.PATH.CONSOLE}`);

miniPSPconsole.turnOn();
