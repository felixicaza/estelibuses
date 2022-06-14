const busPicBtns = document.querySelectorAll('.bus-pic-btn')
const picContainer = document.querySelectorAll('.pic-container')
const busImage = document.querySelectorAll('.bus-image')
const picBtn = document.querySelectorAll('.pic-btn')
const cancelPicBtn = document.querySelectorAll('.cancel-pic-btn')

const firstPicContainer = document.querySelectorAll('.first-pic-container')
const secondPicContainer = document.querySelectorAll('.second-pic-container')

const takePicBtn = document.querySelectorAll('.take-pic-btn')

const bgModalShare = document.getElementById('bg-modal-share')
const modalBusPic = document.getElementById('modal-bus-pic')
const recomendationPicBtn = document.querySelector('.recommendation-pic')
const noScrollOnModal = 'overflow: hidden;'

let stream

busPicBtns.forEach((busPicBtn, index) => {
  busPicBtn.addEventListener('click', async () => {
    bgModalShare.classList.replace('opacity-0', 'opacity-100')
    modalBusPic.classList.replace('pointer-events-none', 'pointer-events-auto')
    modalBusPic.classList.replace('opacity-0', 'opacity-100')
    modalBusPic.classList.replace('scale-0', 'scale-100')
    document.documentElement.setAttribute('style', noScrollOnModal)
    document.body.setAttribute('style', noScrollOnModal)

    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: 985,
        height: 679,
        facingMode: 'environment'
      }
    })

    busImage[index].srcObject = stream

    busPicBtn.classList.add('hidden')
    picContainer[index].classList.remove('hidden')
  })

  recomendationPicBtn.addEventListener('click', () => {
    bgModalShare.classList.replace('opacity-100', 'opacity-0')
    modalBusPic.classList.replace('pointer-events-auto', 'pointer-events-none')
    modalBusPic.classList.replace('opacity-100', 'opacity-0')
    modalBusPic.classList.replace('scale-100', 'scale-0')
    document.documentElement.removeAttribute('style', noScrollOnModal)
    document.body.removeAttribute('style', noScrollOnModal)
  })

  picBtn[index].addEventListener('click', () => {
    busImage[index].pause()
    stream.getTracks()[0].stop()

    const canvasPic = document.createElement('canvas')
    canvasPic.setAttribute('width', 985)
    canvasPic.setAttribute('height', 679)

    const context = canvasPic.getContext('2d')
    context.drawImage(busImage[index], 0, 0, canvasPic.width, canvasPic.height)

    const pic = context.canvas.toDataURL()

    console.log(pic)

    firstPicContainer[index].classList.add('hidden')
    secondPicContainer[index].classList.remove('hidden')
  })

  cancelPicBtn[index].addEventListener('click', () => {
    stream.getTracks()[0].stop()
    busPicBtns[index].classList.remove('hidden')
    picContainer[index].classList.add('hidden')
  })

  takePicBtn[index].addEventListener('click', async () => {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: 985,
        height: 679,
        facingMode: 'environment'
      }
    })

    busImage[index].srcObject = stream

    firstPicContainer[index].classList.remove('hidden')
    secondPicContainer[index].classList.add('hidden')
  })
})
