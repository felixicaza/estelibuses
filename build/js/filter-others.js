/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */

const formFilter = document.getElementById('filter')
const radioCityOne = document.getElementById('city-one')
const radioCityTwo = document.getElementById('city-two')

const cityOneBuses = document.querySelectorAll('.city-one')
const cityTwoBuses = document.querySelectorAll('.city-two')

formFilter.addEventListener('change', e => {
  if (e.target.id === 'city-one' && radioCityOne.checked) {
    cityOneBuses.forEach(cityOne => cityOne.classList.remove('hidden'))
    cityTwoBuses.forEach(cityTwo => cityTwo.classList.add('hidden'))
  }

  if (e.target.id === 'city-two' && radioCityTwo.checked) {
    cityTwoBuses.forEach(cityTwo => cityTwo.classList.remove('hidden'))
    cityOneBuses.forEach(cityOne => cityOne.classList.add('hidden'))
  }
})
