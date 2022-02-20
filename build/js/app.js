/* eslint-disable import/extensions */
/* eslint-disable no-undef */

/**
 * Share
 */

/**
 * Firebase Configuration
 */

import { initializeApp } from './lib/firebase-app.js'
import { getAnalytics } from './lib/firebase-analytics.js'

const whatsappBtn = document.getElementById('whatsapp')
const telegramBtn = document.getElementById('telegram')
const shareBtn = document.getElementById('share')

const shareURL = 'https://estelibuses.web.app/'

const shareData = {
  title: 'Estelí Buses',
  text: '¡Conoce todos los horarios de las terminales de buses de la ciudad de Estelí!',
  url: `${shareURL}?utm_source=sharebtn&utm_medium=webapp&utm_campaign=social_share&utm_content=footer`
}

if (navigator.share) {
  shareBtn.classList.remove('hidden')

  shareBtn.addEventListener('click', () => {
    navigator.share(shareData)
  })
}

const isMobile = navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)

if (isMobile) {
  whatsappBtn.setAttribute(
    'href',
    `whatsapp://send?text=%C2%A1Conoce%20todos%20los%20horarios%20de%20las%20terminales%20de%20buses%20de%20la%20ciudad%20de%20Estel%C3%AD!%0a${shareURL}?utm_source=whatsappmobile&utm_medium=webapp&utm_campaign=social_share&utm_content=footer`
  )
  whatsappBtn.removeAttribute('target')
  telegramBtn.setAttribute(
    'href',
    `tg://msg?text=%C2%A1Conoce%20todos%20los%20horarios%20de%20las%20terminales%20de%20buses%20de%20la%20ciudad%20de%20Estel%C3%AD!%0a${shareURL}?utm_source=telegrammobile&utm_medium=webapp&utm_campaign=social_share&utm_content=footer`
  )
  telegramBtn.removeAttribute('target')
}

/**
 * Share icons for city
 */

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1)
}

if (document.getElementById('whatsapp-city')) {
  const whatsappCity = document.getElementById('whatsapp-city')
  const telegramCity = document.getElementById('telegram-city')
  const shareCity = document.getElementById('share-city')

  const shareDataCity = {
    title: 'Estelí Buses',
    text: `¡Conoce todos los horarios de los buses de Estelí hacia ${capitalize(
      document.querySelector('body header').id
    )}`,
    url: `https://estelibuses.web.app${window.location.pathname}?utm_source=sharebtncity&utm_medium=webapp&utm_campaign=social_share_city&utm_content=header`
  }

  if (navigator.share) {
    shareCity.classList.remove('hidden')

    shareCity.addEventListener('click', () => {
      navigator.share(shareDataCity)
    })
  }

  if (isMobile) {
    whatsappCity.setAttribute(
      'href',
      `whatsapp://send?text=%C2%A1Conoce%20todos%20los%20horarios%20de%20los%20buses%20de%20Estel%C3%AD%20hacia%20${capitalize(
        document.querySelector('body header').id
      )}!%0ahttps://estelibuses.web.app${
        window.location.pathname
      }?utm_source=whatsappmobile&utm_medium=webapp&utm_campaign=social_share_city&utm_content=header`
    )
    whatsappCity.removeAttribute('target')
    telegramCity.setAttribute(
      'href',
      `tg://msg?text=%C2%A1Conoce%20todos%20los%20horarios%20de%20los%20buses%20de%20Estel%C3%AD%20hacia%20${capitalize(
        document.querySelector('body header').id
      )}!%0ahttps://estelibuses.web.app${
        window.location.pathname
      }?utm_source=telegrammobile&utm_medium=webapp&utm_campaign=social_share_city&utm_content=header`
    )
    telegramCity.removeAttribute('target')
  }
}

/**
 * Quicklink instance
 */
window.addEventListener('load', () => {
  quicklink.listen()
})

if (window.location.hostname === 'estelibuses.web.app') {
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
  getAnalytics(app)
}
