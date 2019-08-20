#!/usr/bin/env node

"use strict";

const { contantes } = require('./config/util');

const miniPSPconsole = require(`${contantes.PATH.CONSOLE}`);

miniPSPconsole.turnOn();
