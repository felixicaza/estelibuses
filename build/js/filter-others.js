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
const radioCityOne = document.getElementById('city-one')
const radioCityTwo = document.getElementById('city-two')

const cityOneBuses = document.querySelectorAll('.city-one')
const cityTwoBuses = document.querySelectorAll('.city-two')

formFilter.addEventListener('change', e => {
  if (e.target.id === 'city-one' && radioCityOne.checked) {
    cityOneBuses.forEach(cityOne => cityOne.classList.remove('hidden'))
    cityTwoBuses.forEach(cityTwo => cityTwo.classList.add('hidden'))

    if (window.location.hostname === 'estelibuses.web.app') {
      const appTrackChangeTransportCityOne = initializeApp(firebaseConfig)
      const analytics = getAnalytics(appTrackChangeTransportCityOne)

      logEvent(analytics, 'city_one_change_transport', {
        name: 'City one'
      })
    }
  }

  if (e.target.id === 'city-two' && radioCityTwo.checked) {
    cityTwoBuses.forEach(cityTwo => cityTwo.classList.remove('hidden'))
    cityOneBuses.forEach(cityOne => cityOne.classList.add('hidden'))

    if (window.location.hostname === 'estelibuses.web.app') {
      const appTrackChangeTransportCityTwo = initializeApp(firebaseConfig)
      const analytics = getAnalytics(appTrackChangeTransportCityTwo)

      logEvent(analytics, 'city_two_change_transport', {
        name: 'City two'
      })
    }
  }
})
