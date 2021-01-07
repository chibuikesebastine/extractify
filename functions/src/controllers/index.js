const pdfController = require('./PdfController');

/**
 * Register controllers
 */
module.exports = (server, ioc) => {

  server.use( pdfController(ioc.pdfService) );

};
