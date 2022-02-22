/* eslint-disable no-param-reassign */

if ('loading' in HTMLImageElement.prototype) {
  const picture = document.querySelectorAll('picture > source')
  const images = document.querySelectorAll('img[loading="lazy"]')

  picture.forEach(source => {
    source.srcset = source.dataset.srcset
  })

  images.forEach(img => {
    img.srcset = img.dataset.srcset
  })
} else {
  const script = document.createElement('script')
  script.setAttribute('defer', '')
  script.setAttribute(
    'src',
    'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js'
  )
  script.setAttribute(
    'integrity',
    'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ=='
  )
  script.setAttribute('crossorigin', 'anonymous')
  script.setAttribute('referrerpolicy', 'no-referrer')
  document.body.appendChild(script)
}
