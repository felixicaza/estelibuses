/* eslint-disable no-plusplus */

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
