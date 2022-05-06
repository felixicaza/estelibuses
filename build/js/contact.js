const { form } = document.forms

const name = document.getElementById('name')
const email = document.getElementById('email')
const message = document.getElementById('message')
const submit = document.getElementById('submit')
const submitText = document.getElementById('submitText')
const spinner = document.getElementById('spinner')

const snackbar = document.getElementById('snackbar')
const snackbarContainer = document.querySelector('#snackbar > article')
const snackbarTitle = document.querySelector('#snackbar > article > h3')
const snackbarText = document.querySelector('#snackbar > article > p')

const limitCaptionMessage = document.getElementById('limit-message')

form.addEventListener('input', e => {
  if (e.target.id === 'name') {
    const limitName = name.maxLength || 50

    if (name.value.length >= limitName) {
      e.prevetDefault()
    }

    if (e.target.validity.valid) {
      name.classList.add('border-green-500', 'focus:ring-green-500')
      name.classList.remove('border-red-500', 'focus:ring-red-500')
    } else {
      name.classList.add('border-red-500', 'focus:ring-red-500')
      name.classList.remove('border-green-500', 'focus:ring-green-500')
    }
  }

  if (e.target.id === 'email') {
    const limitEmail = email.maxLength || 60

    if (email.value.length >= limitEmail) {
      e.prevetDefault()
    }

    if (e.target.validity.valid) {
      email.classList.add('border-green-500', 'focus:ring-green-500')
      email.classList.remove('border-red-500', 'focus:ring-red-500')
    } else {
      email.classList.add('border-red-500', 'focus:ring-red-500')
      email.classList.remove('border-green-500', 'focus:ring-green-500')
    }
  }

  if (e.target.id === 'message') {
    const limitMessage = message.maxLength || 850

    if (message.value.length >= limitMessage) {
      e.prevetDefault()
    }

    limitCaptionMessage.textContent = limitMessage - message.value.length

    if (e.target.validity.valid) {
      message.classList.add('border-green-500', 'focus:ring-green-500')
      message.classList.remove('border-red-500', 'focus:ring-red-500')
    } else {
      message.classList.add('border-red-500', 'focus:ring-red-500')
      message.classList.remove('border-green-500', 'focus:ring-green-500')
    }
  }
})

form.addEventListener('submit', e => {
  e.preventDefault()

  if (email.validity.valid && message.validity.valid) {
    submitText.textContent = 'Enviando...'
    submit.setAttribute('disabled', 'true')
    submit.classList.add('cursor-progress')
    spinner.classList.remove('hidden')
  }

  if (!name.validity.valid) {
    name.classList.add('border-red-500', 'focus:ring-red-500')
    name.classList.remove('border-green-500', 'focus:ring-green-500')
  } else {
    name.classList.add('border-green-500', 'focus:ring-green-500')
    name.classList.remove('border-red-500', 'focus:ring-red-500')
  }

  if (!email.validity.valid) {
    email.classList.add('border-red-500', 'focus:ring-red-500')
    email.classList.remove('border-green-500', 'focus:ring-green-500')
  } else {
    email.classList.add('border-green-500', 'focus:ring-green-500')
    email.classList.remove('border-red-500', 'focus:ring-red-500')
  }

  if (!message.validity.valid) {
    message.classList.remove('border-green-500', 'focus:ring-green-500')
    message.classList.add('border-red-500', 'focus:ring-red-500')
  } else {
    message.classList.add('border-green-500', 'focus:ring-green-500')
    message.classList.remove('border-red-500', 'focus:ring-red-500')
  }

  const formData = new URLSearchParams(new FormData(form))

  fetch(
    'https://us-central1-buses-esteli-d2d5e.cloudfunctions.net/form/enviar',
    {
      method: 'POST',
      body: formData
    }
  )
    .then(response => {
      if (response.ok) {
        form.reset()

        name.classList.remove('border-green-500', 'focus:ring-green-500')
        name.classList.remove('border-red-500', 'focus:ring-red-500')

        email.classList.remove('border-green-500', 'focus:ring-green-500')
        email.classList.remove('border-red-500', 'focus:ring-red-500')

        message.classList.remove('border-green-500', 'focus:ring-green-500')
        message.classList.remove('border-red-500', 'focus:ring-red-500')

        submitText.textContent = 'Enviar Mensaje'
        submit.removeAttribute('disabled')
        submit.classList.remove('cursor-progress')
        spinner.classList.add('hidden')
        limitCaptionMessage.textContent = message.maxLength || 850

        return response.json()
      }

      throw new Error(response.status)
    })
    .then(data => {
      snackbarContainer.classList.replace('bg-red-500', 'bg-green-500')
      snackbarTitle.textContent = data.title
      snackbarText.textContent = data.message
      snackbar.classList.replace('translate-y-full', '-translate-y-18')
      snackbar.classList.replace('opacity-0', 'opacity-100')
      setTimeout(() => {
        snackbar.classList.replace('-translate-y-18', 'translate-y-full')
        snackbar.classList.replace('opacity-100', 'opacity-0')
      }, 6000)
    })
    .catch(error => {
      if (error.message === '408' || error.message === '500') {
        submitText.textContent = 'Enviar Mensaje'
        submit.removeAttribute('disabled')
        submit.classList.remove('cursor-progress')
        spinner.classList.add('hidden')

        snackbarTitle.textContent = 'El mensaje no se ha podido enviar'
        snackbarText.textContent =
          'Disculpa las molestias pero por favor, intenta enviar nuevamente tu mensaje.'
        snackbar.classList.replace('translate-y-full', '-translate-y-18')
        snackbarContainer.classList.replace('bg-green-500', 'bg-red-500')
        snackbar.classList.replace('opacity-0', 'opacity-100')
        setTimeout(() => {
          snackbar.classList.replace('-translate-y-18', 'translate-y-full')
          snackbar.classList.replace('opacity-100', 'opacity-0')
        }, 6000)
      }

      if (error.message === '422') {
        submitText.textContent = 'Enviar Mensaje'
        submit.removeAttribute('disabled')
        submit.classList.remove('cursor-progress')
        spinner.classList.add('hidden')
        email.classList.add('border-red-500')
        message.classList.add('border-red-500')

        snackbarTitle.textContent = 'Mensaje no envíado'
        snackbarText.textContent =
          'Por favor verifica que has completado correctamente el campo de nombre, email y de mensaje.'
        snackbar.classList.replace('translate-y-full', '-translate-y-18')
        snackbarContainer.classList.replace('bg-green-500', 'bg-red-500')
        snackbar.classList.replace('opacity-0', 'opacity-100')
        setTimeout(() => {
          snackbar.classList.replace('-translate-y-18', 'translate-y-full')
          snackbar.classList.replace('opacity-100', 'opacity-0')
        }, 6000)
      }
    })
})
