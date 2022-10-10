const picture = document.querySelectorAll(
  'picture[data-loading="lazy"] > source'
)
const images = document.querySelectorAll('img[loading="lazy"]')

picture.forEach((source) => {
  source.srcset = source.dataset.srcset
})

images.forEach((img) => {
  img.srcset = img.dataset.srcset
})
