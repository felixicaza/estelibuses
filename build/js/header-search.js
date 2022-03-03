/* eslint-disable no-plusplus */

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

/**
 * Fix Accesibility mobile navbar when keyboard is open
 */

const navbarMobile = document.getElementById('navbar-mobile')

const isMobile = navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)

citiesSearch.addEventListener('focus', () => {
  if (isMobile) navbarMobile.classList.remove('bottom-0')
})

citiesSearch.addEventListener('blur', () => {
  if (isMobile) navbarMobile.classList.add('bottom-0')
})
