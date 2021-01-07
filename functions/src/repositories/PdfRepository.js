
const uuid = require('uuid')

module.exports = db => {

  const collectionRef = db.collection("pdf");

  const save = async ({ pdfText, browserId = "" }) => {
    const id = uuid.v4();
    try{
      await collectionRef.doc(id)
        .set({ pdfText, browserId, createdDate: new Date() })
      const doc = await collectionRef.doc(id).get();
      return Promise.resolve(Object.assign({id : doc.id, uploadedAt: doc.createTime.toDate()}, doc.data()));
    } catch (err){
      return Promise.reject(err);
    }

  }

  const findByBrowserId = async ({ browserId }) => {
    console.info("browserId in repo is: ", browserId);
    try{
      const docs = await collectionRef.where( "browserId", "==", browserId )
        .orderBy('createdDate', 'desc')
        .get()
      const pdfList = [];
      docs.forEach( doc => {
        pdfList.push(Object.assign({id : doc.id, uploadedAt: doc.createTime.toDate()}, doc.data()))
      })
      return Promise.resolve( pdfList );
    } catch (err){
      return Promise.reject(err);
    }

  }

  return {
    save,
    findByBrowserId
  }
}
