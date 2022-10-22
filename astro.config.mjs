import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'
import { astroImageTools } from 'astro-imagetools'
import critters from 'astro-critters'
import sitemap from 'astro-sitemap'
import compress from 'astro-compress'
import compressor from 'astro-compressor'

const website = 'https://estelibuses.web.app'

// https://astro.build/config
export default defineConfig({
  site: website,
  trailingSlash: 'never',
  server: {
    host: true
  },
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false
      }
    }),
    astroImageTools,
    critters(),
    sitemap({
      canonicalURL: website,
      filter(page) {
        return !/(politica-de-privacidad)/g.test(page)
      },
      lastmod: new Date(),
      createLinkInHead: false,
      xmlns: {
        xhtml: true
      },
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es'
        }
      },
      serialize(item) {
        // eslint-disable-next-line no-param-reassign
        item.url = item.url.replace(/\/$/g, '')
        return item
      }
    }),
    compress({
      img: false,
      svg: false
    }),
    compressor()
  ]
})
