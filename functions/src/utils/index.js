const pdfUtil = require("./PdfUtil");

module.exports = ioc => {
  ioc.bind('pdfUtil', ioc => pdfUtil())
}
