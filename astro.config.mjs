import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import prefetch from '@astrojs/prefetch'
import { astroImageTools } from 'astro-imagetools'
import critters from 'astro-critters'
import sitemap from 'astro-sitemap'
import Compress from 'astro-compress'
import compressor from 'astro-compressor'

const website = 'https://estelibuses.web.app'

// https://astro.build/config
export default defineConfig({
  site: website,
  trailingSlash: 'never',
  scopedStyleStrategy: 'where',
  compressHTML: false,
  server: {
    host: true
  },
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    react(),
    prefetch(),
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
    Compress({
      HTML: {
        collapseBooleanAttributes: true,
        maxLineLength: 0,
        removeAttributeQuotes: false,
        removeComments: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        useShortDoctype: true
      },
      JavaScript: {
        compress: {
          ecma: 2015
        },
        format: {
          comments: false,
          ecma: 2015
        },
        ecma: 2015,
        module: true
      },
      Image: false,
      SVG: false
    }),
    compressor()
  ]
})
