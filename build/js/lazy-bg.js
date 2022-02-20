document.addEventListener('DOMContentLoaded', () => {
  const lazyBackgrounds = [].slice.call(document.querySelectorAll('.lazy-bg'))

  const lazyBackgroundObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        lazyBackgroundObserver.unobserve(entry.target)
      }
    })
  })

  lazyBackgrounds.forEach(lazyBackground => {
    lazyBackgroundObserver.observe(lazyBackground)
  })
})
