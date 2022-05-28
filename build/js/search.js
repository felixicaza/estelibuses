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

const searchForm = document.getElementById('search-form')
const search = document.getElementById('search')

const cityName = document.querySelectorAll('.city-name')
const cardCities = document.querySelectorAll('.card-city')

const noCity = document.getElementById('no-city')

searchForm.addEventListener('input', e => {
  if (e.target.id === 'search') {
    const sanitizeInput = search.value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s/g, '-')

    for (let i = 0; i < cardCities.length; i++) {
      const name = cityName[i].textContent || cityName[i].innerText
      const sanitizeName = name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s/g, '-')

      if (sanitizeName.indexOf(sanitizeInput) > -1) {
        cardCities[i].classList.remove('hidden')
      } else {
        cardCities[i].classList.add('hidden')
      }
    }

    if (
      document.querySelectorAll('.card-city.hidden').length ===
      cardCities.length
    ) {
      noCity.classList.remove('hidden')
    } else {
      noCity.classList.add('hidden')
    }

    if (search.value === '') {
      cardCities.forEach(cardCity => cardCity.classList.remove('hidden'))
    }
  }
})

searchForm.addEventListener('submit', e => e.preventDefault())

/**
 * Fix Accesibility mobile navbar when keyboard is open
 */

const navbarMobile = document.getElementById('navbar-mobile')

const isMobile = navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)

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

search.addEventListener('focus', () => {
  if (window.location.hostname === 'estelibuses.web.app') {
    /**
     * Track use search terminal norte
     */

    if (window.location.pathname === '/terminal-norte-esteli') {
      const appTrackUseSearchNorth = initializeApp(firebaseConfig)
      const analytics = getAnalytics(appTrackUseSearchNorth)

      logEvent(analytics, 'use_search_north', {
        name: 'Buscador terminal norte'
      })
    }

    /**
     * Track use search terminal sur
     */

    if (window.location.pathname === '/terminal-sur-esteli') {
      const appTrackUseSearchSouth = initializeApp(firebaseConfig)
      const analytics = getAnalytics(appTrackUseSearchSouth)

      logEvent(analytics, 'use_search_south', {
        name: 'Buscador terminal sur'
      })
    }
  }
})

search.addEventListener('blur', () => {
  if (window.location.hostname === 'estelibuses.web.app') {
    /**
     * Track not use search terminal norte
     */

    if (window.location.pathname === '/terminal-norte-esteli') {
      const appTrackUseSearchNorth = initializeApp(firebaseConfig)
      const analytics = getAnalytics(appTrackUseSearchNorth)

      logEvent(analytics, 'not_use_search_north', {
        name: 'Desactivado buscador terminal norte'
      })
    }

    /**
     * Track not use search terminal sur
     */

    if (window.location.pathname === '/terminal-sur-esteli') {
      const appTrackUseSearchSouth = initializeApp(firebaseConfig)
      const analytics = getAnalytics(appTrackUseSearchSouth)

      logEvent(analytics, 'not_use_search_south', {
        name: 'Desactivado buscador terminal sur'
      })
    }
  }
})
