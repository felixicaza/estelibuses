/// <reference types="astro/client" />

declare namespace astroHTML.JSX {
  interface SVGAttributes {
    'stroke-linejoin'?:
      | 'arcs'
      | 'miter'
      | 'round'
      | 'bevel'
      | 'inherit'
      | undefined
      | null
  }
}
