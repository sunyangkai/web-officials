export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/vue3': { ssr: false }
  },
  runtimeConfig: {
    newsApiUrl: process.env.NEWS_API_URL || ''
  },
  app: {
    head: {
      title: '融策贷 | 金融贷款服务平台',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: '融策贷提供企业贷、个人经营贷与供应链融资方案，帮助客户快速匹配金融贷款服务。'
        }
      ]
    }
  }
})
