const Response = require('../respones')
const response = Response.response
const { db } = require('../index')


exports.login = async (req, res) => {
  console.log('/user/login')
  let data = {}
  try {
    const { email, password } = req.body
    console.log(' email, password',  email, password)
    if (!email || !password) return res.status(200).json(response(Response.code.reqBodyNotFond, data))
    const [snapshot] = (await db.collection('users').where('email', '==', email).get()).docs.map(doc => doc.data())
    if (!snapshot) return res.status(200).json(response(1011, data))
    if (snapshot.password !== password) return res.status(200).json(response(Response.code.passwordNotMatch, data))
    data = snapshot
    // console.log('res.status(200).json(response(0, data))', res.status(200).json(response(0, data)))
    return res.status(200).json(response(0, data))
  } catch (error) {
    console.log(error)
    return res.status(999).json({ status: { code: 999 }, data })
  }
}

exports.register = async (req, res) => {
  let data = {}
  try {
    console.log('/user/register :: req.body ::', req.body)
    const { email, password_1, password_2 } = req.body
    const [snapshot] = (await db.collection('users').where('email', '==', email).get()).docs.map(doc => doc.data())
    if (snapshot) return res.status(200).json(response(1021, data))
    if (password_1 !== password_2) return res.status(200).json(response(1022, data))
    const _data = {
      email,
      password: password_1,
      type: 'user',
    };
    const resDB = await db.collection('users').doc().set(_data);
    if (resDB) return res.status(200).json(response(0, data))
    return res.status(999).json({ status: { code: 999 }, data })
  } catch (error) {
    console.log(error)
    return res.status(999).json({ status: { code: 999 }, data })
  }
}

exports.getProfile = async (req, res) => {
  let data = {}
  try {
    const { email } = req.body
    // if (!email || !password) return res.status(999).json(response(Response.code.reqBodyNotFond, data))
    const [snapshot] = (await db.collection('users').where('email', '==', email).get()).docs.map(doc => doc.data())
    if (!snapshot) return res.status(999).json(response(1011, data))
    // if (snapshot.password !== password) return res.status(999).json(response(1012, data))
    data = snapshot
    return res.status(200).json(response(0, data))
  } catch (error) {
    console.log(error)
    return res.status(999).json({ status: { code: 999 }, data })
  }
}

exports.updateProfile = async (req, res) => {
  let data = {}
  console.log('/user/profile/update :: req.body ::', req.body)
  try {// check rsuid
    let docId = ''
    const { email, status, detail } = req.body
    const [snapshot] = (await db.collection('users').where('email', '==', email).get()).docs.map(doc => {
      docId = doc.id
      return doc.data()
    })
    if (!snapshot) return res.status(999).json({ status: { code: 999 }, data })
    console.log('status', status)
    const resDB = status ? await db.collection('users').doc(docId).update({ status: status, detail: detail }) : await db.collection('users').doc(docId).update({ detail })
    if (resDB) return res.status(200).json(response(0, data))
    return res.status(999).json({ status: { code: 999 }, data })
  } catch (error) {
    return res.status(999).json({ status: { code: 999 }, data })
  }
}

exports.editStatus = async (req, res) => {
  let data = {}
  console.log('/user/profile/edit/status :: req.body ::', req.body)
  try {
    let docId = ''
    const { rsuId, status } = req.body
    const [snapshot] = (await db.collection('users').where('detail.rsuId', '==', rsuId).get()).docs.map(doc => {
      docId = doc.id
      return doc.data()
    })
    if (!snapshot) return res.status(999).json({ status: { code: 999 }, data })
    console.log('status', status)
    const resDB = await db.collection('users').doc(docId).update({ status: status })
    if (resDB) return res.status(200).json(response(0, data))
    return res.status(999).json({ status: { code: 999 }, data })
  } catch (error) {
    return res.status(999).json({ status: { code: 999 }, data })
  }
}
