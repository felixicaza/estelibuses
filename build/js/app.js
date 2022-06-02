/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-lonely-if */
/* eslint-disable no-undef */

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

if (window.location.hostname === 'estelibuses.web.app') {
  const app = initializeApp(firebaseConfig)
  getAnalytics(app)
}

/**
 * Alert
 */

/* const alert = document.getElementById('alert')
const closeAlert = document.getElementById('close-alert')

closeAlert.addEventListener('click', () => {
  alert.classList.add('hidden')
  localStorage.setItem('hide_alert', 'true')
}) */

/**
 * Sound page click
 */

const soundPage = new Audio('/sounds/switch-tap.mp3')

/**
 * Menu aside
 */

const bgModal = document.getElementById('bg-modal')
const mobileNavBtn = document.getElementById('mobile-nav')
const mobileNav = document.getElementById('mobile')
const noScrollOnModal = 'overflow: hidden;'

mobileNavBtn.addEventListener('click', () => {
  if (localStorage.getItem('sounds_enabled') === 'true') {
    soundPage.play()
  }

  /**
   * Track open menu
   */

  if (window.location.hostname === 'estelibuses.web.app') {
    const appTrackInstall = initializeApp(firebaseConfig)
    const analytics = getAnalytics(appTrackInstall)

    logEvent(analytics, 'open_menu', {
      name: 'Menu abierto'
    })
  }

  bgModal.classList.replace('opacity-0', 'opacity-100')
  bgModal.classList.replace('pointer-events-none', 'pointer-events-auto')

  if (window.matchMedia('min-width: 992px')) {
    mobileNav.classList.remove('-translate-x-full')
    mobileNav.classList.replace('lg:translate-x-full', 'translate-x-0')
  } else {
    mobileNav.classList.replace('-translate-x-full', 'translate-x-0')
  }
  mobileNav.classList.replace('pointer-events-none', 'pointer-events-auto')
  mobileNav.classList.replace('opacity-0', 'opacity-100')
  mobileNav.classList.add('shadow-aside')

  document.documentElement.setAttribute('style', noScrollOnModal)
  document.body.setAttribute('style', noScrollOnModal)
})

bgModal.addEventListener('click', () => {
  if (localStorage.getItem('sounds_enabled') === 'true') {
    soundPage.play()
  }

  /**
   * Track close menu
   */

  if (window.location.hostname === 'estelibuses.web.app') {
    const appTrackInstall = initializeApp(firebaseConfig)
    const analytics = getAnalytics(appTrackInstall)

    logEvent(analytics, 'close_menu', {
      name: 'Menu cerrado'
    })
  }

  bgModal.classList.replace('opacity-100', 'opacity-0')
  bgModal.classList.replace('pointer-events-auto', 'pointer-events-none')

  if (window.matchMedia('min-width: 992px')) {
    mobileNav.classList.replace('translate-x-0', 'lg:translate-x-full')
  } else {
    mobileNav.classList.replace('translate-x-0', '-translate-x-full')
  }
  mobileNav.classList.replace('pointer-events-auto', 'pointer-events-none')
  mobileNav.classList.replace('opacity-100', 'opacity-0')
  mobileNav.classList.remove('shadow-aside')

  document.documentElement.removeAttribute('style', noScrollOnModal)
  document.body.removeAttribute('style', noScrollOnModal)
})

/**
 * Share aside
 */

const shareAside = document.getElementById('share-aside')

const bgModalShare = document.getElementById('bg-modal-share')
const modalShare = document.getElementById('modal-share')

const modalShareLinks = document.querySelectorAll('.modal-share-link')

const shareURLAside = 'https://estelibuses.web.app/'

const shareDataAside = {
  title: 'Estelí Buses',
  text: '¡Conoce todos los horarios de las terminales de buses de la ciudad de Estelí!',
  url: `${shareURLAside}?utm_source=shareasidebtn&utm_medium=webapp&utm_campaign=social_share&utm_content=aside`
}

if (navigator.share) {
  shareAside.addEventListener('click', () => {
    if (localStorage.getItem('sounds_enabled') === 'true') {
      soundPage.play()
    }

    navigator.share(shareDataAside)
  })

  /**
   * Track open native share
   */

  if (window.location.hostname === 'estelibuses.web.app') {
    const appTrackInstall = initializeApp(firebaseConfig)
    const analytics = getAnalytics(appTrackInstall)

    logEvent(analytics, 'share_aside', {
      name: 'Share nativo aside'
    })
  }
} else {
  shareAside.addEventListener('click', () => {
    if (localStorage.getItem('sounds_enabled') === 'true') {
      soundPage.play()
    }

    bgModal.classList.replace('opacity-100', 'opacity-0')
    bgModal.classList.replace('pointer-events-auto', 'pointer-events-none')

    if (window.matchMedia('min-width: 992px')) {
      mobileNav.classList.replace('translate-x-0', 'lg:translate-x-full')
    } else {
      mobileNav.classList.replace('translate-x-0', '-translate-x-full')
    }
    mobileNav.classList.replace('pointer-events-auto', 'pointer-events-none')
    mobileNav.classList.replace('opacity-100', 'opacity-0')
    mobileNav.classList.remove('shadow-aside')

    document.documentElement.removeAttribute('style', noScrollOnModal)
    document.body.removeAttribute('style', noScrollOnModal)

    setTimeout(() => {
      bgModalShare.classList.replace('opacity-0', 'opacity-100')
      bgModalShare.classList.replace(
        'pointer-events-none',
        'pointer-events-auto'
      )

      document.documentElement.setAttribute('style', noScrollOnModal)
      document.body.setAttribute('style', noScrollOnModal)

      modalShare.classList.replace('pointer-events-none', 'pointer-events-auto')
      modalShare.classList.replace('opacity-0', 'opacity-100')
      modalShare.classList.replace('scale-0', 'scale-100')
    }, 800)

    /**
     * Track open custom share
     */

    if (window.location.hostname === 'estelibuses.web.app') {
      const appTrackInstall = initializeApp(firebaseConfig)
      const analytics = getAnalytics(appTrackInstall)

      logEvent(analytics, 'custom_share_aside_open', {
        name: 'Share aside abierto'
      })
    }
  })

  bgModalShare.addEventListener('click', () => {
    if (localStorage.getItem('sounds_enabled') === 'true') {
      soundPage.play()
    }

    bgModalShare.classList.replace('opacity-100', 'opacity-0')
    bgModalShare.classList.replace('pointer-events-auto', 'pointer-events-none')

    document.documentElement.removeAttribute('style', noScrollOnModal)
    document.body.removeAttribute('style', noScrollOnModal)

    modalShare.classList.replace('pointer-events-auto', 'pointer-events-none')
    modalShare.classList.replace('opacity-100', 'opacity-0')
    modalShare.classList.replace('scale-100', 'scale-0')

    /**
     * Track close custom share
     */

    if (window.location.hostname === 'estelibuses.web.app') {
      const appTrackInstall = initializeApp(firebaseConfig)
      const analytics = getAnalytics(appTrackInstall)

      logEvent(analytics, 'custom_share_aside_close', {
        name: 'Share aside cerrado'
      })
    }
  })

  modalShareLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (localStorage.getItem('sounds_enabled') === 'true') {
        soundPage.play()
      }

      bgModalShare.classList.replace('opacity-100', 'opacity-0')
      bgModalShare.classList.replace(
        'pointer-events-auto',
        'pointer-events-none'
      )

      document.documentElement.removeAttribute('style', noScrollOnModal)
      document.body.removeAttribute('style', noScrollOnModal)

      modalShare.classList.replace('pointer-events-auto', 'pointer-events-none')
      modalShare.classList.replace('opacity-100', 'opacity-0')
      modalShare.classList.replace('scale-100', 'scale-0')

      /**
       * Track click on share link
       */

      if (window.location.hostname === 'estelibuses.web.app') {
        const appTrackInstall = initializeApp(firebaseConfig)
        const analytics = getAnalytics(appTrackInstall)

        logEvent(analytics, 'custom_share_aside_click_link', {
          name: 'Share aside click en link'
        })
      }
    })
  })

  /**
   * Track not native share
   */

  if (window.location.hostname === 'estelibuses.web.app') {
    const appTrackInstall = initializeApp(firebaseConfig)
    const analytics = getAnalytics(appTrackInstall)

    logEvent(analytics, 'custom_share_aside', {
      name: 'Share no nativo aside'
    })
  }
}

/**
 * Darkmode
 */

const switchScheme = document.getElementById('switch-scheme')

const colorSchemeDark = window.matchMedia('(prefers-color-scheme: dark)')
let darkModeState = false

const soundDarkMode = new Audio('/sounds/switch.mp3')

function toggleDarkMode(state) {
  document.documentElement.classList.toggle('dark', state)
  darkModeState = state
}

function setDarkModeLocalStorage(state) {
  localStorage.setItem('darkmode', state)
}

toggleDarkMode(localStorage.getItem('darkmode') === 'true')

colorSchemeDark.addListener(e => toggleDarkMode(e.matches))

switchScheme.addEventListener('change', () => {
  if (localStorage.getItem('sounds_enabled') === 'true') {
    soundDarkMode.play()
  }

  darkModeState = !darkModeState

  switchScheme.checked = darkModeState

  toggleDarkMode(darkModeState)
  setDarkModeLocalStorage(darkModeState)

  if (localStorage.getItem('darkmode') === 'true') {
    /**
     * Track if darmode is disabled
     */

    if (window.location.hostname === 'estelibuses.web.app') {
      const appTrackInstall = initializeApp(firebaseConfig)
      const analytics = getAnalytics(appTrackInstall)

      logEvent(analytics, 'darkmode_disabled', {
        name: 'Modo oscuro desactivado'
      })
    }
  } else {
    /**
     * Track if darkmode is enabled
     */

    if (window.location.hostname === 'estelibuses.web.app') {
      const appTrackInstall = initializeApp(firebaseConfig)
      const analytics = getAnalytics(appTrackInstall)

      logEvent(analytics, 'darkmode_enabled', {
        name: 'Modo oscuro activado'
      })
    }
  }
})

window.addEventListener('keydown', e => {
  if (e.altKey === true && e.shiftKey === true && e.key === 'D') {
    if (localStorage.getItem('sounds_enabled') === 'true') {
      soundDarkMode.play()
    }

    darkModeState = !darkModeState

    switchScheme.checked = darkModeState

    toggleDarkMode(darkModeState)
    setDarkModeLocalStorage(darkModeState)

    if (localStorage.getItem('darkmode') === 'true') {
      /**
       * Track if darmode is disabled with keyboard
       */

      if (window.location.hostname === 'estelibuses.web.app') {
        const appTrackInstall = initializeApp(firebaseConfig)
        const analytics = getAnalytics(appTrackInstall)

        logEvent(analytics, 'darkmode_disabled_keyboard', {
          name: 'Modo oscuro desactivado con el teclado'
        })
      }
    } else {
      /**
       * Track if darkmode is enabled
       */

      if (window.location.hostname === 'estelibuses.web.app') {
        const appTrackInstall = initializeApp(firebaseConfig)
        const analytics = getAnalytics(appTrackInstall)

        logEvent(analytics, 'darkmode_enabled_keyboard', {
          name: 'Modo oscuro activado con el teclado'
        })
      }
    }
  }
})

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
    if (localStorage.getItem('sounds_enabled') === 'true') {
      soundPage.play()
    }

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
      if (localStorage.getItem('sounds_enabled') === 'true') {
        soundPage.play()
      }

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

  /**
   * Track if esteli buses is open from app
   */

  if (window.location.hostname === 'estelibuses.web.app') {
    if (window.location.search === '?utm_source=web_app') {
      const appTrackInstall = initializeApp(firebaseConfig)
      const analytics = getAnalytics(appTrackInstall)

      logEvent(analytics, 'estelibuses_app_open', {
        name: 'Esteli Buses abierto desde la app'
      })
    }
  }

  /**
   * Set sound enabled by default
   */

  if (localStorage.getItem('sounds_enabled') !== 'false') {
    localStorage.setItem('sounds_enabled', 'true')
  }
})

/**
 * Sound switch
 */

const switchSound = document.getElementById('switch-sound')
const labelSound = document.getElementById('label-sound')
const soundDisableIcon = document.getElementById('sound-disable')
const soundEnableIcon = document.getElementById('sound-enable')

switchSound.addEventListener('change', e => {
  if (!e.target.checked) {
    localStorage.setItem('sounds_enabled', 'false')
    labelSound.textContent = 'Activar sonidos'
    soundEnableIcon.classList.toggle('hidden')
    soundDisableIcon.classList.toggle('hidden')
    switchSound.checked = false
  } else {
    localStorage.setItem('sounds_enabled', 'true')

    if (localStorage.getItem('sounds_enabled') === 'true') {
      soundDarkMode.play()
    }

    labelSound.textContent = 'Desactivar sonidos'
    soundEnableIcon.classList.toggle('hidden')
    soundDisableIcon.classList.toggle('hidden')
    switchSound.checked = true
  }
})

/**
 * Reload Button
 */

const reloadBtn = document.getElementById('reload')

function showUpdateFounded(registration) {
  reloadBtn.classList.replace('opacity-0', 'opacity-100')

  setTimeout(() => {
    if (isMobile) {
      reloadBtn.classList.replace('translate-y-18', '-translate-y-18')
    } else {
      reloadBtn.classList.replace('right-0', 'left-0')
      reloadBtn.classList.replace('-translate-x-4', 'translate-x-8')
      reloadBtn.classList.replace('translate-y-18', '-translate-y-12')
    }
  }, 500)

  reloadBtn.addEventListener('click', () => {
    if (localStorage.getItem('sounds_enabled') === 'true') {
      soundPage.play()
    }

    if (registration.waiting) {
      registration.waiting.postMessage('SKIP_WAITING')
    }

    /**
     * Track if pwa is updated
     */

    if (window.location.hostname === 'estelibuses.web.app') {
      const appTrackUpdate = initializeApp(firebaseConfig)
      const analytics = getAnalytics(appTrackUpdate)

      logEvent(analytics, 'estelibuses_updated', {
        name: 'Estelí Buses fue actualizado'
      })
    }
  })
}

/**
 * Install Service Worker
 */

window.addEventListener('load', async () => {
  /**
   * Track serviceWorker unsupported
   */

  if (window.location.hostname === 'estelibuses.web.app') {
    const swSupport = 'serviceWorker' in navigator

    if (!swSupport) {
      const appTrackUpdate = initializeApp(firebaseConfig)
      const analytics = getAnalytics(appTrackUpdate)

      logEvent(analytics, 'service_worker_unsupported', {
        name: 'Service Worker no soportado'
      })
    }
  }

  const registration = await navigator.serviceWorker.register('/sw.js')

  if (registration.waiting) {
    showUpdateFounded(registration)
  }

  registration.addEventListener('updatefound', () => {
    if (registration.installing) {
      registration.installing.addEventListener('statechange', () => {
        if (registration.waiting) {
          if (navigator.serviceWorker.controller) {
            showUpdateFounded(registration)
          }
        }
      })
    }
  })
})

/**
 * Reload
 */

let refreshing

navigator.serviceWorker.addEventListener('controllerchange', () => {
  if (!refreshing) {
    window.location.reload()
    refreshing = true
  }
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
  installBtn.classList.replace('pointer-events-none', 'pointer-events-auto')
})

window.addEventListener('appinstalled', () => {
  deferredPrompt = null

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
  if (localStorage.getItem('sounds_enabled') === 'true') {
    soundPage.play()
  }

  deferredPrompt.prompt()

  const { outcome } = await deferredPrompt.userChoice

  if (outcome === 'accepted') {
    deferredPrompt = null
  }
})

/**
 * Play sound page
 */

const pages = document.querySelectorAll('a')

pages.forEach(page => {
  page.addEventListener('click', () => {
    if (localStorage.getItem('sounds_enabled') === 'true') {
      soundPage.play()
    }
  })
})
