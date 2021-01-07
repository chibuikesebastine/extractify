const PDFJS = require('pdfjs-dist/es5/build/pdf.js');

module.exports = (pdfUtil, pdfRepository) => {

  const create = async ({ files, browserId }) => {

    return Promise.all(
      files.filter( file => {
          return file.mimetype === 'application/pdf'
        })
        .map( file => {
          return pdfUtil.toText(file.buffer)
            .then( pdfText => {
              return pdfRepository.save({
                pdfText, browserId
              })
            })
        })
    )
  }

  const findByBrowserId = ({browserId}) => {
    return pdfRepository.findByBrowserId({browserId})
  }

  return{
    create,
    findByBrowserId
  }
}
