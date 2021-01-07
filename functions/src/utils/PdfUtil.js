const PDFJS = require('pdfjs-dist/es5/build/pdf.js');

const getPageText = async (pdfPage) => {
  const tokenizedText = await pdfPage.getTextContent();
  return tokenizedText.items.map(token => token.str).join("");
};
const toText = async data => {
  return PDFJS.getDocument(data)
    .promise
    .then( async pdf => {
      console.info(`Pdf is:`, pdf)
      const pageTextPromises = [];
      for(let pageIndex = 1; pageIndex <= pdf.numPages; pageIndex++ ){
        // eslint-disable-next-line no-await-in-loop
        const pdfPage = await pdf.getPage(pageIndex);
        pageTextPromises.push(getPageText(pdfPage))
      }
      return await Promise.all(pageTextPromises);
    })
    .then( textArray => textArray.join(" \n ") )
}

module.exports = () => {

  return {
    toText
  }
}
