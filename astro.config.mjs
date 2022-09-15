import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'

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
    })
  ]
})
