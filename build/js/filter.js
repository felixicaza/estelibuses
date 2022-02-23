/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */

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

formFilter.addEventListener('change', e => {
  if (e.target.id === 'all' && radioAll.checked) {
    // TODO: Borrar cuándo sea necesario
    // Actualizar el número del título de todos los buses cuándo sean visibles
    transportTitles.forEach(
      (title, index) => (title.textContent = `Horario #${index + 1}`)
    )

    expressBuses.forEach(express => express.classList.remove('hidden'))
    routedBuses.forEach(routed => routed.classList.remove('hidden'))
  }

  if (e.target.id === 'express' && radioExpress.checked) {
    // TODO: Borrar cuándo sea necesario
    // Actualizar el número del título de los buses expresos cuándo éstos sean visibles
    for (let i = 0; i < expressTitles.length; i++) {
      expressTitles[i].textContent = `Horario Expreso #${i + 1}`
    }

    expressBuses.forEach(express => express.classList.remove('hidden'))
    routedBuses.forEach(routed => routed.classList.add('hidden'))
  }

  if (e.target.id === 'routed' && radioRouted.checked) {
    // TODO: Borrar cuándo sea necesario
    // Actualizar el número del título de los buses ruteados cuándo éstos sean visibles
    for (let i = 0; i < routedTitles.length; i++) {
      routedTitles[i].textContent = `Horario Ruteado #${i + 1}`
    }

    routedBuses.forEach(routed => routed.classList.remove('hidden'))
    expressBuses.forEach(express => express.classList.add('hidden'))
  }
})
