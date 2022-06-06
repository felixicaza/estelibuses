/* eslint-disable import/extensions */

import { initializeApp } from './lib/firebase-app.js'
import {
  getFirestore,
  collection,
  addDoc,
  connectFirestoreEmulator
} from './lib/firebase-firestore.js'

const firebaseConfig = {
  apiKey: 'AIzaSyAqPF5z2zeJCAXKmnAV6gfapspOK4joCEs',
  authDomain: 'buses-esteli-d2d5e.firebaseapp.com',
  projectId: 'buses-esteli-d2d5e',
  storageBucket: 'buses-esteli-d2d5e.appspot.com',
  messagingSenderId: '47347043568',
  appId: '1:47347043568:web:e1b9a83b88c35fe1a0c635',
  measurementId: 'G-4QFJH1D53Q'
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
connectFirestoreEmulator(db, 'localhost', 8080)

const likes = document.querySelectorAll('.like')

likes.forEach(like => {
  like.addEventListener('click', async () => {
    const getIp = await fetch('https://api.bigdatacloud.net/data/client-ip')
    const response = await getIp.json()

    console.log(response)

    try {
      const docRef = await addDoc(collection(db, 'users'), {
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
      })
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  })
})
