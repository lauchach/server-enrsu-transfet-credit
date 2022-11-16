// const firebase = require('firebase')
// import firebase from 'firebase'
// const firebase = require('firebase/compat/app')
// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src='https://www.gstatic.com/firebasejs/7.3.0/firebase-app.js'></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->

const { initializeApp } = require('firebase/app')
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite')
// const firebase = require('firebase')
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDrWKLkH2ZDIldE0mp-Wwmplc38smqkQ5Y',
  authDomain: 'engineeringrsu-transfet-credit.firebaseapp.com',
  databaseURL: 'https://engineeringrsu-transfet-credit.firebaseio.com',
  projectId: 'engineeringrsu-transfet-credit',
  storageBucket: 'engineeringrsu-transfet-credit.appspot.com',
  messagingSenderId: '1006677879863',
  appId: '1:1006677879863:web:375a6e95a8b1958dc9a3b2'
}

// const app = initializeApp(firebaseConfig);
const app = initializeApp({
  // The `projectId` parameter is optional and represents which project the
  // client will act on behalf of. If not supplied, it falls back to the default
  // project inferred from the environment.
  projectId: 'engineeringrsu-transfet-credit',
});

const db = getFirestore(app);

// // Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }

module.exports = getFirestore

// var firebaseConfig = {
//   apiKey: 'AIzaSyDrWKLkH2ZDIldE0mp-Wwmplc38smqkQ5Y',
//   authDomain: 'engineeringrsu-transfet-credit.firebaseapp.com',
//   databaseURL: 'https://engineeringrsu-transfet-credit.firebaseio.com',
//   projectId: 'engineeringrsu-transfet-credit',
//   storageBucket: 'engineeringrsu-transfet-credit.appspot.com',
//   messagingSenderId: '1006677879863',
//   appId: '1:1006677879863:web:375a6e95a8b1958dc9a3b2'
// }
// Initialize Firebase

// module.exports = mongoose.angpow_conn.model('angpow-users', userSchema)
// exports.fb = firebase.initializeApp(firebaseConfig)
// exports const fb = 
