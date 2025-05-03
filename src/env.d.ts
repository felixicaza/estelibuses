declare module 'astro-imagetools';
declare module 'astro-imagetools/components';

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
