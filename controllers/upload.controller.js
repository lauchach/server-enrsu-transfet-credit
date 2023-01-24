const Response = require('../respones')
const response = Response.response
const { db } = require('../index')


exports.uploadImg = async (req, res) => {
  let data = {}
  try {
    console.log('/uploadImg :: req.body ::', req.body)
    const { rsuId, link } = req.body
    const [snapshot] = (await db.collection('uploads').where('rsuId', '==', rsuId).get()).docs.map(doc => doc.data())
    if (snapshot) return res.status(200).json(response(1021, data))
    const _data = {
      rsuId,
      linkImg: link,
    };
    const resDB = await db.collection('uploads').doc().set(_data);
    if (resDB) return res.status(200).json(response(0, data))
    return res.status(999).json({ status: { code: 999 }, data })
  } catch (error) {
    console.log(error)
    return res.status(999).json({ status: { code: 999 }, data })
  }
}

exports.GetImgLink = async (req, res) => {
  let data = {}
  try {
    console.log('GetImgLink :: req.body ::', req.body)
    const { rsuId, link } = req.body
    const [snapshot] = (await db.collection('uploads').where('rsuId', '==', rsuId).get()).docs.map(doc => doc.data())
    if (snapshot) data = snapshot
    return res.status(200).json(response(0, data))
  } catch (error) {
    console.log(error)
    return res.status(999).json({ status: { code: 999 }, data })
  }
}