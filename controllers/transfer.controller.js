const Response = require('../respones')
const response = Response.response
const { db } = require('../index')


exports.userUpdate = async (req, res) => {
  let subjects = []
  try {
    const { email, data } = req.body
    const [snapshot] = (await db.collection('users').where('email', '==', email).get()).docs.map(doc => doc.data())
    let oldData = (await db.collection('record').doc(snapshot.detail.rsuId).get()).data()
    if (oldData) {
      for (const element of data) {
        if (oldData.subjects.find(v => v.subjectid === element.subjectid)) return res.status(200).json(response(2001, ))
      }
      subjects = [...oldData.subjects, ...data]
    }
    const _data = {
      rsuid: snapshot.detail.rsuId,
      subjects: oldData ? subjects : data
    }
    await db.collection('record').doc(snapshot.detail.rsuId).set(_data)
    return res.status(200).json(response(0, _data))
  } catch (error) {
    console.log(error)
    return res.status(999).json({ status: { code: 999 }, data })
  }
}
