const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const port = 3000


const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('./engineeringrsu-transfet-credit-672acc7edeaa');

  
initializeApp({
  credential: cert(serviceAccount)
});

exports.db = getFirestore()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.options('*', cors()) 


const userRouter = require('./router/user.router')
const transferRouter = require('./router/transfer.router')


app.use('/user', userRouter)
app.use('/transfer', transferRouter)


// app.post('/user/login', async (req, res) => {
//   console.log('/user/login')
//   let data = {}
//   try {
//     const { email, password } = req.body
//     console.log(' email, password',  email, password)
//     if (!email || !password) return res.status(200).json(response(Response.code.reqBodyNotFond, data))
//     const [snapshot] = (await db.collection('users').where('email', '==', email).get()).docs.map(doc => doc.data())
//     if (!snapshot) return res.status(200).json(response(1011, data))
//     if (snapshot.password !== password) return res.status(200).json(response(Response.code.passwordNotMatch, data))
//     data = snapshot
//     console.log('res.status(200).json(response(0, data))', res.status(200).json(response(0, data)))
//     // return res.status(200).json(response(0, data))
//   } catch (error) {
//     console.log(error)
//     return res.status(999).json({ status: { code: 999 }, data })
//   }
// })

// app.post('/user/register', async (req, res) => {
//   let data = {}
//   try {
//     console.log('/user/register :: req.body ::', req.body)
//     const { email, password_1, password_2 } = req.body
//     const [snapshot] = (await db.collection('users').where('email', '==', email).get()).docs.map(doc => doc.data())
//     if (snapshot) return res.status(200).json(response(1021, data))
//     if (password_1 !== password_2) return res.status(200).json(response(1022, data))
//     const _data = {
//       email,
//       password: password_1,
//       type: 'user',
//     };
//     const resDB = await db.collection('users').doc().set(_data);
//     if (resDB) return res.status(200).json(response(0, data))
//     return res.status(999).json({ status: { code: 999 }, data })
//   } catch (error) {
//     console.log(error)
//     return res.status(999).json({ status: { code: 999 }, data })
//   }
// })

// app.post('/user/profile/get', async (req, res) => {
//   let data = {}
//   try {
//     const { email } = req.body
//     // if (!email || !password) return res.status(999).json(response(Response.code.reqBodyNotFond, data))
//     const [snapshot] = (await db.collection('users').where('email', '==', email).get()).docs.map(doc => doc.data())
//     if (!snapshot) return res.status(999).json(response(1011, data))
//     // if (snapshot.password !== password) return res.status(999).json(response(1012, data))
//     data = snapshot
//     return res.status(200).json(response(0, data))
//   } catch (error) {
//     console.log(error)
//     return res.status(999).json({ status: { code: 999 }, data })
//   }
// })

// app.post('/user/profile/update', async (req, res) => {
//   let data = {}
//   console.log('/user/profile/update :: req.body ::', req.body)
//   try {
//     let docId = ''
//     const { email, detail } = req.body
//     const [snapshot] = (await db.collection('users').where('email', '==', email).get()).docs.map(doc => {
//       docId = doc.id
//       return doc.data()
//     })
//     if (!snapshot) return res.status(999).json({ status: { code: 999 }, data })
//     const _data = { detail }
//     const resDB = await db.collection('users').doc(docId).update(_data)
//     if (resDB) return res.status(200).json(response(0, data))
//     return res.status(999).json({ status: { code: 999 }, data })
//   } catch (error) {
//     return res.status(999).json({ status: { code: 999 }, data })
//   }
// })
app.post('/', async (req, res) => {
  let data = []
  const userlist = (await db.collection('users').get()).docs.map(doc => doc.data())
  data = userlist
  return res.status(200).json({ status: { code: 200 }, data })
})


app.listen(port, () => {
  console.log('Start server at port 3000.')
})
