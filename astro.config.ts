import { defineConfig } from 'astro/config'

import tailwindcss from "@tailwindcss/vite";

import { astroImageTools } from 'astro-imagetools'
import playformCompress from '@playform/compress'
import playformInline from '@playform/inline'
import sitemap from 'astro-sitemap'
import compressor from 'astro-compressor'

const website = 'https://estelibuses.web.app'

// https://astro.build/config
export default defineConfig({
  site: website,
  prefetch: {
    prefetchAll: true,
  },
  trailingSlash: 'never',
  compressHTML: false,
  server: {
    host: true
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    astroImageTools,
    playformInline(),
    sitemap({
      canonicalURL: website,
      filter(page) {
        return !/(politica-de-privacidad)/g.test(page)
      },
      lastmod: new Date(),
      createLinkInHead: false,
      xmlns: {
        xhtml: true,
        video: false,
        image: false,
        news: false
      },
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es'
        }
      },
      serialize(item) {
        item.url = item.url.replace(/\/$/g, '')
        return item
      }
    }),
    playformCompress({
      HTML: {
        'html-minifier-terser': {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          maxLineLength: 0,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          noNewlinesBeforeTagClose: true,
          removeAttributeQuotes: false,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          sortAttributes: true,
          sortClassName: true,
          useShortDoctype: true
        }
      },
      JavaScript: {
        terser: {
          compress: {
            arguments: true,
            drop_console: true
          },
          format: {
            comments: false,
            indent_level: 2
          },
          ecma: 2020
        }
      },
      Cache: true,
      CSS: false,
      Image: false,
      SVG: false
    }),
    compressor()
  ]
})
