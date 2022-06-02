/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */

/**
 * Firebase Import Analytics
 */

import { initializeApp } from './lib/firebase-app.js'
import { getAnalytics, logEvent } from './lib/firebase-analytics.js'

/**
 * Firebase Configuration
 */

const firebaseConfig = {
  apiKey: 'AIzaSyAqPF5z2zeJCAXKmnAV6gfapspOK4joCEs',
  authDomain: 'buses-esteli-d2d5e.firebaseapp.com',
  projectId: 'buses-esteli-d2d5e',
  storageBucket: 'buses-esteli-d2d5e.appspot.com',
  messagingSenderId: '47347043568',
  appId: '1:47347043568:web:e1b9a83b88c35fe1a0c635',
  measurementId: 'G-4QFJH1D53Q'
}

const formFilter = document.getElementById('filter')
const radioAll = document.getElementById('all')
const radioExpress = document.getElementById('express')
const radioRouted = document.getElementById('routed')

const expressBuses = document.querySelectorAll('.expreso')
const routedBuses = document.querySelectorAll('.ruteado')

// TODO: Borrar cuándo sea necesario
// Obtener la cantidad de títulos de los buses expresos y ruteados
const transportTitles = document.querySelectorAll('.titles')
const expressTitles = document.querySelectorAll('.expreso > .titles')
const routedTitles = document.querySelectorAll('.ruteado > .titles')

const soundRadio = new Audio('/sounds/switch.mp3')

formFilter.addEventListener('change', e => {
  if (e.target.id === 'all' && radioAll.checked) {
    if (localStorage.getItem('sounds_enabled') === 'true') {
      soundRadio.play()
    }

    localStorage.setItem('managua_transport_type', 'all')

    // TODO: Borrar cuándo sea necesario
    // Actualizar el número del título de todos los buses cuándo sean visibles
    transportTitles.forEach(
      (title, index) => (title.textContent = `Horario #${index + 1}`)
    )

    expressBuses.forEach(express => {
      express.classList.remove('hidden')

      if (express.classList.contains('up')) {
        express.classList.remove('up')
        window.requestAnimationFrame(() => express.classList.add('up'))
      } else {
        express.classList.add('up')
      }
    })
    routedBuses.forEach(routed => {
      routed.classList.remove('hidden')

      if (routed.classList.contains('up')) {
        routed.classList.remove('up')
        window.requestAnimationFrame(() => routed.classList.add('up'))
      } else {
        routed.classList.add('up')
      }
    })

    /**
     * Track select all
     */

    if (window.location.hostname === 'estelibuses.web.app') {
      const appTrackChangeTransportAll = initializeApp(firebaseConfig)
      const analytics = getAnalytics(appTrackChangeTransportAll)

      logEvent(analytics, 'all_change_transport', {
        name: 'Todos los buses'
      })
    }
  }

  if (e.target.id === 'express' && radioExpress.checked) {
    if (localStorage.getItem('sounds_enabled') === 'true') {
      soundRadio.play()
    }

    localStorage.setItem('managua_transport_type', 'express')

    // TODO: Borrar cuándo sea necesario
    // Actualizar el número del título de los buses expresos cuándo éstos sean visibles
    for (let i = 0; i < expressTitles.length; i++) {
      expressTitles[i].textContent = `Horario Expreso #${i + 1}`
    }

    expressBuses.forEach(express => {
      express.classList.remove('hidden')

      if (express.classList.contains('up')) {
        express.classList.remove('up')
        window.requestAnimationFrame(() => express.classList.add('up'))
      } else {
        express.classList.add('up')
      }
    })
    routedBuses.forEach(routed => {
      routed.classList.add('hidden')
      routed.classList.remove('up')
    })

    /**
     * Track select expresos
     */

    if (window.location.hostname === 'estelibuses.web.app') {
      const appTrackChangeTransportExpress = initializeApp(firebaseConfig)
      const analytics = getAnalytics(appTrackChangeTransportExpress)

      logEvent(analytics, 'express_change_transport', {
        name: 'Buses expresos'
      })
    }
  }

  if (e.target.id === 'routed' && radioRouted.checked) {
    if (localStorage.getItem('sounds_enabled') === 'true') {
      soundRadio.play()
    }

    localStorage.setItem('managua_transport_type', 'routed')

    // TODO: Borrar cuándo sea necesario
    // Actualizar el número del título de los buses ruteados cuándo éstos sean visibles
    for (let i = 0; i < routedTitles.length; i++) {
      routedTitles[i].textContent = `Horario Ruteado #${i + 1}`
    }

    routedBuses.forEach(routed => {
      routed.classList.remove('hidden')

      if (routed.classList.contains('up')) {
        routed.classList.remove('up')
        window.requestAnimationFrame(() => routed.classList.add('up'))
      } else {
        routed.classList.add('up')
      }
    })
    expressBuses.forEach(express => {
      express.classList.add('hidden')
      express.classList.remove('up')
    })

    /**
     * Track select ruteados
     */

    if (window.location.hostname === 'estelibuses.web.app') {
      const appTrackChangeTransportRouted = initializeApp(firebaseConfig)
      const analytics = getAnalytics(appTrackChangeTransportRouted)

      logEvent(analytics, 'routed_change_transport', {
        name: 'Buses ruteados'
      })
    }
  }
})
