/* eslint-disable import/extensions */

import { initializeApp } from './lib/firebase-app.js'
import { getStorage, ref, uploadString } from './lib/firebase-storage.js'

const firebaseConfig = {
  apiKey: 'AIzaSyAqPF5z2zeJCAXKmnAV6gfapspOK4joCEs',
  authDomain: 'buses-esteli-d2d5e.firebaseapp.com',
  projectId: 'buses-esteli-d2d5e',
  storageBucket: 'buses-esteli-d2d5e.appspot.com',
  messagingSenderId: '47347043568',
  appId: '1:47347043568:web:e1b9a83b88c35fe1a0c635',
  measurementId: 'G-4QFJH1D53Q'
}

const firebaseApp = initializeApp(firebaseConfig)
const storage = getStorage(firebaseApp)

const busPicBtns = document.querySelectorAll('.bus-pic-btn')
const picContainer = document.querySelectorAll('.pic-container')
const busImage = document.querySelectorAll('.bus-image')
const picBtn = document.querySelectorAll('.pic-btn')
const sendPicBtn = document.querySelectorAll('.send-píc-btn')
const cancelPicBtn = document.querySelectorAll('.cancel-pic-btn')

const congrats = document.querySelectorAll('.congrats')

const firstPicContainer = document.querySelectorAll('.first-pic-container')
const secondPicContainer = document.querySelectorAll('.second-pic-container')

const takePicBtn = document.querySelectorAll('.take-pic-btn')

const bgModalShare = document.getElementById('bg-modal-share')
const modalBusPic = document.getElementById('modal-bus-pic')
const recomendationPicBtn = document.querySelector('.recommendation-pic')
const noScrollOnModal = 'overflow: hidden;'

let stream
let pic

const supportDevices =
  'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices

busPicBtns.forEach((busPicBtn, index) => {
  if (!supportDevices) {
    busPicBtn.classList.add('hidden')
  }

  window.addEventListener('offline', () => {
    if (!navigator.onLine) {
      busPicBtn.classList.add('hidden')
    } else {
      busPicBtn.classList.remove('hidden')
    }
  })

  window.addEventListener('online', () => {
    if (!navigator.onLine) {
      busPicBtn.classList.add('hidden')
    } else {
      busPicBtn.classList.remove('hidden')
    }
  })

  busPicBtn.addEventListener('click', async () => {
    bgModalShare.classList.replace('opacity-0', 'opacity-100')

    modalBusPic.classList.replace('pointer-events-none', 'pointer-events-auto')
    modalBusPic.classList.replace('opacity-0', 'opacity-100')
    modalBusPic.classList.replace('scale-0', 'scale-100')

    document.documentElement.setAttribute('style', noScrollOnModal)
    document.body.setAttribute('style', noScrollOnModal)

    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: 1200,
        height: 827,
        facingMode: 'environment'
      }
    })

    busImage[index].srcObject = stream

    picContainer[index].classList.replace(
      'pointer-events-none',
      'pointer-events-auto'
    )
    picContainer[index].classList.replace('opacity-0', 'opacity-100')
    picContainer[index].classList.replace('scale-0', 'scale-100')

    bgModalShare.classList.replace('opacity-0', 'opacity-100')

    document.documentElement.setAttribute('style', noScrollOnModal)
    document.body.setAttribute('style', noScrollOnModal)
  })

  picBtn[index].addEventListener('click', () => {
    busImage[index].pause()
    stream.getTracks()[0].stop()

    const canvasPic = document.createElement('canvas')
    canvasPic.setAttribute('width', 1200)
    canvasPic.setAttribute('height', 827)

    const context = canvasPic.getContext('2d')
    context.drawImage(busImage[index], 0, 0)

    pic = context.canvas.toDataURL()

    firstPicContainer[index].classList.add('hidden')

    secondPicContainer[index].classList.add('up')
    secondPicContainer[index].classList.remove('hidden')
  })

  sendPicBtn[index].addEventListener('click', async () => {
    const nameImage = `${window.location.pathname
      .replace(/\//, '')
      .replace(/\//, '-')}-${document
      .querySelectorAll('.titles')
      [index].textContent.toLowerCase()
      .replace(' ', '')
      .replace('#', '-')}`
    const storageRef = ref(storage, nameImage)

    await uploadString(storageRef, pic, 'data_url')

    picContainer[index].classList.replace(
      'pointer-events-auto',
      'pointer-events-none'
    )
    picContainer[index].classList.replace('opacity-100', 'opacity-0')
    picContainer[index].classList.replace('scale-100', 'scale-0')

    bgModalShare.classList.replace('opacity-100', 'opacity-0')

    document.documentElement.removeAttribute('style', noScrollOnModal)
    document.body.removeAttribute('style', noScrollOnModal)

    busPicBtns[index].classList.add('hidden')
    congrats[index].classList.remove('hidden')

    setTimeout(() => {
      busPicBtns[index].classList.remove('hidden')
      busPicBtns[index].classList.add('up')
      congrats[index].classList.add('hidden')
    }, 7500)
  })

  cancelPicBtn[index].addEventListener('click', () => {
    stream.getTracks()[0].stop()

    picContainer[index].classList.replace(
      'pointer-events-auto',
      'pointer-events-none'
    )
    picContainer[index].classList.replace('opacity-100', 'opacity-0')
    picContainer[index].classList.replace('scale-100', 'scale-0')

    bgModalShare.classList.replace('opacity-100', 'opacity-0')

    document.documentElement.removeAttribute('style', noScrollOnModal)
    document.body.removeAttribute('style', noScrollOnModal)
  })

  takePicBtn[index].addEventListener('click', async () => {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: 1200,
        height: 827,
        facingMode: 'environment'
      }
    })

    busImage[index].srcObject = stream

    firstPicContainer[index].classList.add('up')
    firstPicContainer[index].classList.remove('hidden')

    secondPicContainer[index].classList.add('hidden')
  })
})

recomendationPicBtn.addEventListener('click', () => {
  modalBusPic.classList.replace('pointer-events-auto', 'pointer-events-none')
  modalBusPic.classList.replace('opacity-100', 'opacity-0')
  modalBusPic.classList.replace('scale-100', 'scale-0')
})
