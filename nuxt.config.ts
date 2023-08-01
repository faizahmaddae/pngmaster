// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true},
  modules: ['nuxt-simple-sitemap'],
  app: {
    head: {
      title: 'PNG Master',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1' },
        { hid: 'description', name: 'description', content: 'High quality cutout png images in PNG Master, free and unlimited downloads' },
        // { hid: 'og:site_name', property: 'og:site_name', content: 'PNG Master' },
        // { hid: 'og:type', property: 'og:type', content: 'website' },
        // { hid: 'og:title', property: 'og:title', content: 'PNG Master' },

      ],
          
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css' },
        
      ],
      script: [
        { src: 'https://code.jquery.com/jquery-3.6.0.min.js', body: true },
        { src: 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js', body: true },
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js', body: true },
        { src: 'https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.js', body: true },
        { src: '/js/masonry.pkgd.min.js', body: true },
      ],
    },
  }
})
