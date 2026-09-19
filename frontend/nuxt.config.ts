// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: true,
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '',
      useMock: true,
    },
  },
  routeRules: {
    '/customer/join': { redirect: '/', redirectCode: 302 },
  },
  app: {
    head: {
      title: 'Q-Flow Queue Management',
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap' },
      ],
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
});