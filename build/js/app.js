/* eslint-disable import/extensions */
/* eslint-disable no-undef */

/**
 * Firebase Import Analytics
 */

import { initializeApp } from './lib/firebase-app.js'
import { getAnalytics, logEvent } from './lib/firebase-analytics.js'

/**
 * Share
 */

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

if (document.getElementById('whatsapp-city')) {
  const whatsappCity = document.getElementById('whatsapp-city')
  const telegramCity = document.getElementById('telegram-city')
  const shareCity = document.getElementById('share-city')

  const documentTitle =
    document.title[0].toLocaleLowerCase() + document.title.substr(1)

  const shareDataCity = {
    title: 'Estelí Buses',
    text: `¡Conoce todos los ${documentTitle}!`,
    url: `https://estelibuses.web.app${window.location.pathname}?utm_source=sharebtncity&utm_medium=webapp&utm_campaign=social_share_city&utm_content=header`
  }

  if (navigator.share) {
    shareCity.classList.remove('hidden')

    shareCity.addEventListener('click', () => {
      navigator.share(shareDataCity)
    })
  }

  if (isMobile) {
    const documentTitleLinks =
      document.title[0].toLocaleLowerCase() + document.title.substr(1)
    const documentTitleURL = documentTitleLinks.replace(/\s/g, '%20')

    whatsappCity.setAttribute(
      'href',
      `whatsapp://send?text=%C2%A1Conoce%20todos%20los%20${documentTitleURL}!%0ahttps://estelibuses.web.app${window.location.pathname}?utm_source=whatsappmobile&utm_medium=webapp&utm_campaign=social_share_city&utm_content=header`
    )
    whatsappCity.removeAttribute('target')
    telegramCity.setAttribute(
      'href',
      `tg://msg?text=%C2%A1Conoce%20todos%20los%20${documentTitleURL}!%0ahttps://estelibuses.web.app${window.location.pathname}?utm_source=telegrammobile&utm_medium=webapp&utm_campaign=social_share_city&utm_content=header`
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

if (window.location.hostname === 'estelibuses.web.app') {
  const app = initializeApp(firebaseConfig)
  getAnalytics(app)
}

/**
 * Install Service Worker
 */

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js')
})

/**
 * Custom button install PWA
 */

const installBtn = document.getElementById('install')
const installBtnMobileIcon = document.querySelector('#install .mobile')
const installBtnDesktopIcon = document.querySelector('#install .desktop')
let deferredPrompt

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault()

  deferredPrompt = e

  if (!isMobile) {
    installBtnMobileIcon.classList.add('hidden')
    installBtnDesktopIcon.classList.remove('hidden')
  }

  installBtn.classList.replace('opacity-0', 'opacity-100')

  setTimeout(() => {
    if (isMobile) {
      installBtn.classList.replace('translate-y-18', '-translate-y-18')
    } else {
      installBtn.classList.replace('left-0', 'right-0')
      installBtn.classList.replace('translate-x-4', '-translate-x-8')
      installBtn.classList.replace('translate-y-18', '-translate-y-12')
    }
  }, 3000)
})

window.addEventListener('appinstalled', () => {
  deferredPrompt = null

  installBtn.classList.add('opacity-0')
  installBtn.classList.add('translate-y-18')

  /**
   * Track if pwa is installed
   */

  if (window.location.hostname === 'estelibuses.web.app') {
    const appTrackInstall = initializeApp(firebaseConfig)
    const analytics = getAnalytics(appTrackInstall)

    logEvent(analytics, 'installed_estelibuses', {
      name: 'Estelí Buses fue instalado'
    })
  }
})

installBtn.addEventListener('click', async () => {
  deferredPrompt.prompt()

  const { outcome } = await deferredPrompt.userChoice

  if (outcome === 'accepted') {
    deferredPrompt = null

    installBtn.classList.add('opacity-0')
    installBtn.classList.add('translate-y-18')
  }
})

/**
 * Close notification
 */

const containerNotification = document.getElementById('container-notification')
const closeNotification = document.getElementById('notification-close')

window.addEventListener('load', () => {
  if (localStorage.getItem('hidden-notification-new') !== 'true') {
    containerNotification.style.opacity = '1'

    setTimeout(() => {
      containerNotification.style.transform = 'translate(-0.75rem, 1.5rem)'
    }, 3800)
  }
})

closeNotification.addEventListener('click', () => {
  localStorage.setItem('hidden-notification-new', true)
  containerNotification.style.transform = 'translateY(-100%)'
  containerNotification.style.opacity = '0'
})
