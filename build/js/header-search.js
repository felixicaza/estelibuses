/* eslint-disable import/extensions */
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

const mainSearch = document.getElementById('main-search')
const citiesSearch = document.getElementById('cities-search')

const containerCities = document.getElementById('container-cities')
const cities = document.querySelectorAll('.cities')
const citiesName = document.querySelectorAll('.cities > a span')

const unknownCity = document.getElementById('unknown-city')

mainSearch.addEventListener('input', e => {
  if (e.target.id === 'cities-search') {
    containerCities.style.opacity = '1'
    containerCities.style.transform = 'translateY(0)'
    containerCities.style.pointerEvents = 'auto'

    const sanitizeInput = citiesSearch.value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s/g, '-')

    for (let i = 0; i < citiesName.length; i++) {
      const name = citiesName[i].textContent || citiesName[i].innerText
      const sanitizeName = name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s\(\w{8}\s\w{5}\)/, '')
        .replace(/\s\(\w{8}\s\w{3}\)/, '')
        .replace(/\s/g, '-')

      if (sanitizeName.indexOf(sanitizeInput) > -1) {
        cities[i].classList.remove('hidden')
      } else {
        cities[i].classList.add('hidden')
      }
    }

    if (document.querySelectorAll('.cities.hidden').length === cities.length) {
      unknownCity.classList.remove('hidden')
    } else {
      unknownCity.classList.add('hidden')
    }

    if (citiesSearch.value === '') {
      containerCities.style.opacity = '0'
      containerCities.style.transform = 'translateY(30%)'
      containerCities.style.pointerEvents = 'none'
    }
  }
})

mainSearch.addEventListener('submit', e => e.preventDefault())

const isMobile = navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)
const navbarMobile = document.getElementById('navbar-mobile')

/**
 * Ocultar navbar cuándo se activa el teclado virtual
 */

const initialSize = window.innerHeight

if (isMobile) {
  window.addEventListener('resize', () => {
    const resizeHeight = window.innerHeight

    const percent = initialSize / resizeHeight

    if (percent > 1.35) {
      navbarMobile.classList.remove('-bottom-px')
    } else {
      navbarMobile.classList.add('-bottom-px')
    }
  })
}

/**
 * Track use header search
 */

citiesSearch.addEventListener('focus', () => {
  if (window.location.hostname === 'estelibuses.web.app') {
    const appTrackUseHeaderSearch = initializeApp(firebaseConfig)
    const analytics = getAnalytics(appTrackUseHeaderSearch)

    logEvent(analytics, 'use_header_search', {
      name: 'Buscador de la página de inicio'
    })
  }
})

/**
 * Track not use header search
 */

citiesSearch.addEventListener('blur', () => {
  if (window.location.hostname === 'estelibuses.web.app') {
    const appTrackUseHeaderSearch = initializeApp(firebaseConfig)
    const analytics = getAnalytics(appTrackUseHeaderSearch)

    logEvent(analytics, 'not_use_header_search', {
      name: 'Desactivado buscador de la página de inicio'
    })
  }
})
