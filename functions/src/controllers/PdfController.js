const express = require('express');
const { expects } = require('./utils');

module.exports = pdfService => {

  const router = express.Router();

  const uploadPdf = (req, res, next) => {
    return pdfService.create({ files : req.files, browserId: req.body.browserId })
      .then( pdf => {
        return res.status(200).send( pdf );
      })
      .catch( err => {
        console.info( "Err", err, {structuredData: true});
        return res.status(err.statusCode || 500).send({ message: "Failed" });
      })
  };

  const findByBrowserId = (req, res, next) => {
    console.info("Params: ", req.params);

    return pdfService.findByBrowserId({browserId : req.params.browserId})
      .then( data => {
        return res.status(200).send( data );
      })
      .catch( err => {
        console.info( "Err", err, {structuredData: true});
        return res.status(err.statusCode || 500).send({ message: "Failed" });
      })
  };

  // Routes
  router.post('/upload', expects('multipart/form-data'), uploadPdf);
  router.get('/browser/:browserId', findByBrowserId);

  return express.Router().use("/pdf", router) ;
}

