const adsLoad = document.querySelectorAll('.ads-load')
const adsPlaceholder = document.querySelectorAll('.ads-placeholder')

const insertAdSense = document.createElement('script')
insertAdSense.setAttribute(
  'src',
  'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4534198821642047'
)
insertAdSense.setAttribute('async', 'true')
insertAdSense.setAttribute('crossorigin', 'true')
insertAdSense.setAttribute('fetchpriority', 'high')
insertAdSense.setAttribute('importance', 'high')

const ads = (ad, index) => {
  const options = {
    threshold: 1,
    rootMargin: '0px 0px -23% 0px'
  }

  const observeAds = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (index === 0) {
          document.head.appendChild(insertAdSense)
        }

        adsPlaceholder[index].classList.add('hidden')

        observer.unobserve(entry.target)
      }
    })
  }, options)

  return observeAds.observe(ad)
}

adsLoad.forEach(ads)
