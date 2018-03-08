#!/usr/bin/env node
const path = require('path');
const { argv } = require('yargs');

const PhoneNumber = require('../api/models/phone-number.model');
const { importCsv } = require('./utils');

const csvFile = argv._[0];
const headers = ['number', 'context', 'name'];

if (!csvFile) {
  console.log('Please provide filename');
  process.exit(1);
}

importCsv(path.resolve(csvFile), headers, PhoneNumber);
