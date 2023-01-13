const Response = require('../respones')
const response = Response.response
const { db } = require('../index')


exports.userUpdate = async (req, res) => {
  let subjects = []
  try {
    const { email, data } = req.body
    console.log('10email, data', email, data)
    let docId = ''
    if (!data) return res.status(200).json(response(1022, data))
    const [snapshot] = (await db.collection('users').where('email', '==', email).get()).docs.map(doc => {
      docId = doc.id
      return doc.data()
    })
    // let oldData = (await db.collection('record').doc(snapshot.detail.rsuId).get()).data()
    // if (oldData) {
    //   for (const element of data) {
    //     if (oldData.subjects.find(v => v.subjectid === element.subjectid)) return res.status(200).json(response(2001, ))
    //   }
    //   subjects = [...oldData.subjects, ...data]
    // }
    const _data = {
      rsuId: snapshot.detail.rsuId,
      // subjects: oldData ? subjects : data
      subjects: data
    }
    await db.collection('record').doc(snapshot.detail.rsuId).set(_data)
    if (docId) await db.collection('users').doc(docId).update({ status: 'รอการเทียบโอน' })
    return res.status(200).json(response(0, _data))
  } catch (error) {
    console.log('error', error)
    return res.status(999).json({ status: { code: 999 } })
  }
}

// exports.recordFetch = async (req, res) => {
//   try {
//     let data = []
//     const snapshot = await db.collection('record').get();
//     await snapshot.forEach(doc => {
//       let docData = doc.data()
//       data.push(docData)
//     })
//     for (let i = 0; i < data.length; i++) {
//       const [_snapshot] = (await db.collection('users').where('detail.rsuId', '==', data[i].rsuId).get()).docs.map(doc => doc.data())
//       data[i].email = _snapshot.email
//       data[i].detail = _snapshot.detail
//     }
//     return res.status(200).json(response(0, data))
//   } catch (error) {
//     console.log(error)
//     return res.status(999).json({ status: { code: 999 } })
//   }
// }

exports.recordFetch = async (req, res) => {
  try {
    const { rsuId } = req.body
    console.log('54rsuId', rsuId)
    const [snapshot] = (await db.collection('record').where('rsuId', '==', rsuId).get()).docs.map(doc => doc.data())
    const data = snapshot || {}
    return res.status(200).json(response(0, data))
  } catch (error) {
    console.log(error)
    return res.status(999).json({ status: { code: 999 } })
  }
}

exports.recordFetchFull = async (req, res) => {
  try {
    const { rsuId } = req.body
    console.log('54rsuId', rsuId)
    const [snapshot] = (await db.collection('record').where('rsuId', '==', rsuId).get()).docs.map(doc => doc.data())
    let data = snapshot || {}
    let mapRsuDatas = []
    if (data) {
      for (let index = 0; index <  data.mapRsuDatas.length; index++) {
        let [_data] = (await db.collection('SUBJECT_RSU_TABLE').where('Subject_id', '==', data.mapRsuDatas[index].SubjecteRSUId).get()).docs.map(doc => doc.data())
        mapRsuDatas = [ ...mapRsuDatas, { ...data.mapRsuDatas[index], ..._data } ]
        
        data.mapRsuDatas[index].SubjectIds.forEach((v, i, a) => {
          let __data = data.subjects.find(y => y.subjectid === v.subjectid)
          if (__data) data.mapRsuDatas[index].SubjectIds[i] = {...data.mapRsuDatas[index].SubjectIds[i], ...__data}
        })
      }
      // cols 
      let cols = []
      mapRsuDatas.forEach((v) => {
        v.SubjectIds.forEach((y, i, a) => {
        cols = [...cols, {
          rsuSubjecteId: i < 1 ? v.SubjecteRSUId : '',
          rsuSubjectName: i < 1 ? v.Subject_Name : '',
          rsuSubjectCredit: i < 1 ? v.Subject_Credit : '',
          rsuSubjectGrade: i < 1 ? '+C' : '',
          subjectid: y.subjectid,
          subjectGrade: y.subjectGrade,
          subjectCredit: y.subjectCredit,
          subjectName: y.subjectName,
         }]
        })
      })
      // console.log('103cols', cols)
      return res.status(200).json(response(0, {
        rsuId,
        cols,
      }))
    }
  } catch (error) {
    console.log(error)
    return res.status(999).json({ status: { code: 999 } })
  }
}

exports.recordList = async (req, res) => {
  try {
    let data = []
    const snapshot = await db.collection('record').get('rsuId');
    await snapshot.forEach(doc => {
      let docData = doc.data()
      data.push(docData)
    })
    for (let i = 0; i < data.length; i++) {
      const [_snapshot] = (await db.collection('users').where('detail.rsuId', '==', data[i].rsuId).get()).docs.map(doc => doc.data())
      data[i].detail = _snapshot.detail
      data[i].status = _snapshot.status
    }
    return res.status(200).json(response(0, data))
  } catch (error) {
    console.log(error)
    return res.status(999).json({ status: { code: 999 } })
  }
}

exports.transferSubject = async (req, res) => {
  try {
    let data = [], subjectRSUid = '', isMore = false, recommends = []
    const { subjectid } = req.body
    const [_snapshot] = (await db.collection('MAPPIN_TABLE').where('subject2plus1', 'array-contains', subjectid).get()).docs.map(doc => {
      subjectRSUid = doc.id
      isMore = true
      return doc.data()
    })
    const [snapshot] = (await db.collection('MAPPIN_TABLE').where('subject', 'array-contains', subjectid).get()).docs.map(doc => {
      subjectRSUid = doc.id
      return doc.data()
    })
    if (_snapshot && _snapshot.subject2plus1 && !snapshot) recommends = _snapshot.subject2plus1
    data = {
      subjectRSUid,
      isMore,
      recommends
    }
    if (subjectRSUid) {
      const [snapshotRSUSubject] = (await db.collection('SUBJECT_RSU_TABLE').where('Subject_id', '==', subjectRSUid).get()).docs.map(doc => doc.data())
      let rsuSubject = {
        subjectRSUid: snapshotRSUSubject.Subject_id,
        subjectRSUName: snapshotRSUSubject.Subject_Name,
        subjectRSUCredit: snapshotRSUSubject.Subject_Credit,
      }
      data = { ...data, rsuSubject }
    }
    return res.status(200).json(response(0, data))
  } catch (error) {
    console.log(error)
    return res.status(999).json({ status: { code: 999 } })
  }
}

exports.transferRSUSave = async (req, res) => {
  try {
    let docId = '', data = {}, mapRsuDatas = []
    console.log('124req.body', req.body.rsuId)
    const { rsuId, records } = req.body
    const [snapshot] = (await db.collection('record').where('rsuId', '==', rsuId).get()).docs.map(doc => {
      docId = doc.id
      return doc.data()
    })
    if (!snapshot || !docId) return res.status(999).json({ status: { code: 999 }, data })
    console.log('snapshot131', snapshot)
    records.map((v, i, a) => {
      console.log('137', v)
      let _data = {
        subjectid: v.subjectid,
        subjectGrade: v.subjectGrade
      }
      if (mapRsuDatas.find(a => a.SubjecteRSUId !== v.rsu.subjectRSUid) || !mapRsuDatas.length) {
        let mapRsuData = {
          SubjecteRSUId: v.rsu.subjectRSUid,
          SubjectIds: [_data], // [{SubjectId, Grade}]
        }
        mapRsuDatas = [...mapRsuDatas, mapRsuData]
      } else {
        let index = mapRsuDatas.findIndex(a => a.SubjecteRSUId === v.rsu.subjectRSUid)
        mapRsuDatas[index].SubjectIds = [...mapRsuDatas[index].SubjectIds, _data]
      }
      //
    })
    // console.log('146', mapRsuDatas)
    const resDB = await db.collection('record').doc(docId).update({ mapRsuDatas })
    if (resDB) return res.status(200).json(response(0, mapRsuDatas))
    return res.status(999).json({ status: { code: 999 }, data: mapRsuDatas })
  } catch (error) {
    console.log(error)
    return res.status(999).json({ status: { code: 999 }, data: {} })
  }
}

exports.subjectList = async (req, res) => {
  try {
    let data = []
    const {  } = req.body
    const _snapshot = (await db.collection('SUBJECT_TABLE').get()).docs.map(doc => {
      return doc.data()
    })
    data = _snapshot
    return res.status(200).json(response(0, data))
  } catch (error) {
    console.log(error)
    return res.status(999).json({ status: { code: 999 } })
  }
}

exports.transferSubjectApprove = async (req, res) => {
  try {
    let docId = '', data = {}
    const { rsuId, subjectId } = req.body
    let [snapshot] = (await db.collection('record').where('rsuId', '==', rsuId).get()).docs.map(doc => {
      docId = doc.id
      return doc.data()
    })
    if (!snapshot || !docId) return res.status(999).json({ status: { code: 999 }, data })
    snapshot.subjects.map((v, i, a) => {
      console.log('187', v.subjectid ,'===', subjectId)
      if (v.subjectid === subjectId) v.status = 'APPROVE'
    })
    const resDB = await db.collection('record').doc(docId).update({ subjects: snapshot.subjects })
    if (resDB) return res.status(200).json(response(0, snapshot.subjects))
    return res.status(999).json({ status: { code: 999 }, data: snapshot.subjects })
  } catch (error) {
    console.log(error)
    return res.status(999).json({ status: { code: 999 }, data: {} })
  }
}

exports.transferSubjectUnApprove = async (req, res) => {
  try {
    let docId = '', data = {}
    const { rsuId, subjectId } = req.body
    let [snapshot] = (await db.collection('record').where('rsuId', '==', rsuId).get()).docs.map(doc => {
      docId = doc.id
      return doc.data()
    })
    if (!snapshot || !docId) return res.status(999).json({ status: { code: 999 }, data })
    snapshot.subjects.map((v, i, a) => {
      console.log('207', v.subjectid ,'===', subjectId)
      if (v.subjectid === subjectId) v.status = 'UNAPPROVE'
    })
    const resDB = await db.collection('record').doc(docId).update({ subjects: snapshot.subjects })
    if (resDB) return res.status(200).json(response(0, snapshot.subjects))
    return res.status(999).json({ status: { code: 999 }, data: snapshot.subjects })
  } catch (error) {
    console.log(error)
    return res.status(999).json({ status: { code: 999 }, data: {} })
  }
}

exports.subjecRSUtList = async (req, res) => {
  try {
    let data = []
    const {  } = req.body
    const _snapshot = (await db.collection('SUBJECT_RSU_TABLE').get()).docs.map(doc => {
      return doc.data()
    })
    data = _snapshot
    return res.status(200).json(response(0, data))
  } catch (error) {
    console.log(error)
    return res.status(999).json({ status: { code: 999 } })
  }
}