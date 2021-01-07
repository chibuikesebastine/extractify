
const IOC = require('./ioc');
const repositories = require('../repositories');
const services = require('../services');
const utils = require('../utils');
const controllers = require('../controllers');


module.exports = (server, db) => {

  const ioc = new IOC();

  ioc.bind("db", ioc => db )
  utils(ioc)
  repositories(ioc)
  services(ioc)
  controllers( server, ioc)
}
