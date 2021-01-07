const pdfRepository = require("./PdfRepository");

module.exports = ioc => {

  ioc.bind('pdfRepository', ioc => pdfRepository(ioc.db))

}
