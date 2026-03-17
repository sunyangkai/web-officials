type NewsItem = {
  id: number
  title: string
  summary: string
  category: string
  publishedAt: string
  source?: string
}

type RemoteNewsItem = Partial<NewsItem> & {
  date?: string
  desc?: string
}

function normalizeNewsItem(item: RemoteNewsItem, index: number): NewsItem {
  return {
    id: Number(item.id ?? index + 1),
    title: item.title?.trim() || `新闻资讯 ${index + 1}`,
    summary: item.summary?.trim() || item.desc?.trim() || '暂无摘要',
    category: item.category?.trim() || '行业资讯',
    publishedAt: item.publishedAt?.trim() || item.date?.trim() || new Date().toISOString().slice(0, 10),
    source: item.source?.trim() || '外部接口'
  }
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  const fallbackNews: NewsItem[] = [
    {
      id: 1,
      title: '普惠金融持续发力，中小微企业融资需求稳步回升',
      summary: '围绕经营周转、淡旺季备货与订单扩张的贷款需求增加，企业更加关注审批效率与综合融资成本。',
      category: '行业动态',
      publishedAt: '2026-03-16',
      source: '融策贷研究部'
    },
    {
      id: 2,
      title: '数字化风控加速落地，贷款服务进入精细化匹配阶段',
      summary: '金融机构开始更多结合税务、开票、流水等多维数据，为企业客户提供更适配的授信建议。',
      category: '市场观察',
      publishedAt: '2026-03-14',
      source: '金融市场观察'
    },
    {
      id: 3,
      title: '供应链融资需求增长，核心企业上下游资金管理受关注',
      summary: '订单稳定但账期较长的企业，更倾向选择围绕应收账款与采购场景的融资产品以提升现金流稳定性。',
      category: '融资策略',
      publishedAt: '2026-03-12',
      source: '产业融资周刊'
    }
  ]

  if (!config.newsApiUrl) {
    return fallbackNews
  }

  try {
    const remoteNews = await $fetch<RemoteNewsItem[] | { list?: RemoteNewsItem[]; data?: RemoteNewsItem[] }>(config.newsApiUrl)
    const list = Array.isArray(remoteNews)
      ? remoteNews
      : Array.isArray(remoteNews?.list)
        ? remoteNews.list
        : Array.isArray(remoteNews?.data)
          ? remoteNews.data
          : []

    const normalized = list.map(normalizeNewsItem)
    return normalized.length ? normalized : fallbackNews
  } catch {
    return fallbackNews
  }
})
