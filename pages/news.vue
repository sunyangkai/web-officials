<script setup lang="ts">
type NewsItem = {
  id: number
  title: string
  summary: string
  category: string
  publishedAt: string
  source?: string
}

useSeoMeta({
  title: '新闻资讯 | 融策贷',
  description: '查看金融贷款相关动态、政策观察与融资市场资讯。'
})

const {
  data: newsList,
  error,
  pending,
  refresh
} = await useAsyncData<NewsItem[]>(
  'news-list',
  () => $fetch('/api/news'),
  {
    server: true,
    lazy: false,
    default: () => [],
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    }
  }
)

const featuredNews = computed(() => newsList.value?.[0] || null)
const remainingNews = computed(() => newsList.value?.slice(1) || [])
</script>

<template>
  <section class="section news-page">
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">News</p>
        <h1>新闻资讯</h1>
        <p class="section-text">
          页面数据通过接口获取，可继续替换为你的真实新闻服务接口。
        </p>
      </div>

      <div v-if="pending" class="state-box">
        <p>正在加载新闻资讯...</p>
      </div>

      <div v-else-if="error" class="state-box state-error">
        <p>新闻接口请求失败，请稍后重试。</p>
        <button class="btn btn-primary" @click="refresh()">重新加载</button>
      </div>

      <div v-else-if="newsList.length" class="news-stack">
        <article v-if="featuredNews" class="news-featured">
          <div class="news-meta">
            <span>{{ featuredNews.category }}</span>
            <time>{{ featuredNews.publishedAt }}</time>
          </div>
          <h2>{{ featuredNews.title }}</h2>
          <p>{{ featuredNews.summary }}</p>
          <span v-if="featuredNews.source" class="news-source">来源：{{ featuredNews.source }}</span>
        </article>

        <div class="news-list">
          <article v-for="item in remainingNews" :key="item.id" class="news-card">
            <div class="news-meta">
              <span>{{ item.category }}</span>
              <time>{{ item.publishedAt }}</time>
            </div>
            <h2>{{ item.title }}</h2>
            <p>{{ item.summary }}</p>
            <span v-if="item.source" class="news-source">来源：{{ item.source }}</span>
          </article>
        </div>
      </div>

      <div v-else class="state-box">
        <p>当前暂无新闻资讯。</p>
      </div>
    </div>
  </section>
</template>
