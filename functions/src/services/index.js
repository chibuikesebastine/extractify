const pdfService = require("./PdfService");

module.exports = ioc => {

  ioc.bind('pdfService', ioc => pdfService(ioc.pdfUtil, ioc.pdfRepository))

}
