<div align="center">

![Estelí Buses](./public/img/estelibuses-logo.png)

[![Lighthouse Performance Badge](./public/performance/lighthouse_performance.svg)](https://github.com/Felix-Icaza/estelibuses)
[![Lighthouse Accessibility Badge](./public/performance/lighthouse_accessibility.svg)](https://github.com/Felix-Icaza/estelibuses)
[![Lighthouse Best Practices Badge](./public/performance/lighthouse_best-practices.svg)](https://github.com/Felix-Icaza/estelibuses)
[![Lighthouse SEO Badge](./public/performance/lighthouse_seo.svg)](https://github.com/Felix-Icaza/estelibuses)
[![Lighthouse PWA Badge](./public/performance/lighthouse_pwa.svg)](https://github.com/Felix-Icaza/estelibuses)

</div>

Estelí Buses es la primer plataforma para conocer los horarios de las terminales de buses del municipio de Estelí - Nicaragua.

## Motivación

Estelí Buses, fue creado con la principal idea de poder brindar de forma fácil y rápida a la población del municipio de [Estelí - Nicaragua](https://es.wikipedia.org/wiki/Estel%C3%AD) (mi ciudad natal) la información relacionada a los horarios de salida de los autobuses interlocales. Durante muchos años había sido una información muy difícil de obtener, ya que, los ciudadanos no teníamos una forma fácil de consultar esa información.

Cuándo se dio a conocer esta plataforma (inicialmente lanzada al público el 27 de Febrero de 2022), tuvo una gran aceptación por parte de todos los pobladores tanto locales como a nivel nacional. Algunos medios de comunicación que publicaron sobre este proyecto:

- [Joven esteliano crea aplicación enfocada en los horarios de buses de las terminales de Estelí](https://radioabcstereo.com/nota/20991_joven-esteliano-crea-aplicacion-enfocada-en-los-horarios-de-buses-de-las-terminales-de-esteli)
- [Gran aceptación para aplicación web sobre los horarios de buses de Estelí](https://radioabcstereo.com/nota/21129_gran-aceptacion-para-aplicacion-web-sobre-los-horarios-de-buses-de-esteli)
- [Joven crea una app móvil gratuita para conocer horarios de buses en Estelí](https://100noticias.com.ni/nacionales/113758-joven-crea-app-movil-gratuita-horario-bus-esteli/)
- [«Estelí Buses», el innovador proyecto del joven desarrollador web Félix Icaza](https://ipnicaragua.com/esteli-buses-el-innovador-proyecto-del-joven-desarrollador-web-felix-icaza/)
- [Crean aplicación enfocada en horarios de buses de terminales de Estelí](https://radiolaprimerisima.com/noticias-generales/generales/crean-aplicacion-enfocada-en-horarios-de-buses-de-terminales-de-esteli/)
- [Joven crea aplicación enfocada en los horarios de buses de las terminales de Estelí](https://radiouraccansiuna.com/joven-crea-aplicacion-enfocada-en-los-horarios-de-buses-de-las-terminales-de-esteli/)
- [Joven crea una aplicación digital que informa sobre horarios y destinos de autobuses interurbanos de Estelí](https://obreradelatecla.com/joven-crea-una-aplicacion-digital-que-informa-sobre-horarios-y-destinos-de-autobuses-interurbanos-de-esteli/)
- [Joven crea una de las aplicaciones más esperadas en Estelí](https://www.stereo-romance.com/departamentales/esteli/16973-joven-crea-una-de-las-aplicaciones-mas-esperadas-en-esteli.html)
- [Joven esteliano alcanza éxitos y popularidad en las redes sociales](https://www.facebook.com/telenortenic/videos/joven-esteliano-alcanza-%C3%A9xitos-y-popularidad-en-las-redes-sociales/261913276152210/)

Agradezco muchísimo todo el apoyo y la motivación que recibí ❤️.

## Detalles técnicos

Estelí Buses es una Progressive Web App (PWA), está construída con las siguientes técnologías:

- [Astro](https://astro.build/)
- [TailwindCSS](https://tailwindcss.com/)
- [PNPM](https://pnpm.io/), cómo administrador de paquetes.

### Estructura del proyecto

El proyecto está organizado siguiendo la [estructura recomendada por Astro](https://docs.astro.build/es/core-concepts/project-structure/).

- [`public`](public): En esta carpeta se encuentran todas las imágenes y archivos necesarios para el proyecto en producción.

- [`src`](src): Es la carpeta que contiene todo el código principal del proyecto.

  - [`components`](src/components): Componentes que son reutilizados a lo largo del proyecto.

  - [`content`](src/content): En esta carpeta se encuentra los componentes utilizados en el archivo [`index.astro`](https://github.com/Felix-Icaza/estelibuses/blob/main/src/pages/index.astro).

  - [`data`](src/data): Aquí se encuentran todos los datos de los horarios de los autobuses de las terminales y otros datos útiles para el proyecto.

  - [`layouts`](src/layouts): Componentes principales que definen la estructura final del proyecto.

  - [`pages`](src/pages): En esta carpeta se encuentran los archivos con los nombres de las rutas que serán construidas en el proyecto en producción.

    - [`[horarios]/[horario].astro`](src/pages/%5Bhorarios%5D/%5Bhorario%5D.astro): Este archivo genera dinámicamente todas las vistas correspondientes a cada horario de cada terminal.

    - [`[terminal].astro`](src/pages/%5Bterminal%5D.astro): En este archivo se generan las landing pages correspondientes a las terminales ([https://estelibuses.web.app/terminal-norte-esteli](https://estelibuses.web.app/terminal-norte-esteli) y [https://estelibuses.web.app/terminal-sur-esteli](https://estelibuses.web.app/terminal-sur-esteli)).

  - [`scripts`](src/scripts) y [`styles`](src/styles): En estas carpetas se encuentran algunos scripts y archivos css respectivamente, necesarios para el proyecto.

## Contribución

Sería un gusto si deseas contribuir a Estelí Buses. Para poder enviar tu contribución puedes clonas este repositorio:

```bash
git clone https://github.com/Felix-Icaza/estelibuses.git
```

Entras en el proyecto.

```bash
cd estelibuses
```

Luego instalas las dependencias con el comando:

```bash
pnpm install
```

Para iniciar el proyecto ejecutas el comando:

```bash
pnpm dev
```

## Agradecimientos

Agradezco enormemente al personal de la terminal sur y al personal de la terminal norte, por toda su amable y atenta contribución para ayudarme a recopilar la información necesaria de las salidas de buses y que gracias a ello, me permitieron poder crear este proyecto que ayuda a todos los residentes y visitantes del municipio de Estelí.

## Licencia

Este proyecto utiliza la licencia GPL-3.0. Por favor revisa [La Licencia](LICENSE) para más información.
