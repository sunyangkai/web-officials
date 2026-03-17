# 网站 SEO 与 HTML 结构规范

本文面向官网、内容页、新闻页、产品页等常见站点页面，整理了通用 SEO 做法，以及 Google 与百度两套搜索引擎的落地要求。内容以官方公开文档为准，整理时间为 `2026-03-16`。

## 1. SEO 的核心目标

SEO 不是“堆关键词”，而是让搜索引擎更容易完成下面 4 件事：

1. 发现页面：爬虫能顺利访问 URL、链接、Sitemap、静态资源。
2. 理解页面：页面主题明确，标题、正文、结构化标记一致。
3. 判断质量：内容原创、信息完整、体验稳定、无欺骗行为。
4. 正确展示：标题、摘要、面包屑、站点名称、图片等可在搜索结果中正常生成。

## 2. 页面 HTML 结构怎么做

推荐所有重要页面都遵循下面这套结构。

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>页面核心主题 - 品牌名</title>
    <meta
      name="description"
      content="用一段自然语言概括本页内容、价值点和用户收益，避免堆砌关键词。"
    />

    <link rel="canonical" href="https://www.example.com/page" />

    <meta name="robots" content="index,follow,max-image-preview:large" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="页面核心主题 - 品牌名" />
    <meta
      property="og:description"
      content="社交分享摘要通常可复用 description，但允许更偏传播表达。"
    />
    <meta property="og:url" content="https://www.example.com/page" />
    <meta property="og:image" content="https://www.example.com/cover.jpg" />

    <link rel="icon" href="/favicon.ico" sizes="any" />
  </head>
  <body>
    <header>
      <nav aria-label="主导航">
        <a href="/">首页</a>
        <a href="/products">产品</a>
        <a href="/news">新闻</a>
        <a href="/about">关于我们</a>
      </nav>
    </header>

    <main>
      <article>
        <header>
          <h1>页面唯一主标题</h1>
          <p>发布时间、作者、更新日期等辅助信息</p>
        </header>

        <section>
          <h2>一级内容模块</h2>
          <p>正文内容要真实、可读、可直接回答搜索意图。</p>
        </section>

        <section>
          <h2>第二个内容模块</h2>
          <h3>子模块标题</h3>
          <p>继续展开说明，不要只放图片或只靠 JS 注入文本。</p>
        </section>
      </article>
    </main>

    <footer>
      <nav aria-label="底部导航">
        <a href="/sitemap.xml">Sitemap</a>
        <a href="/privacy">隐私政策</a>
      </nav>
    </footer>
  </body>
</html>
```

## 3. HTML 结构的具体要求

### 3.1 `head` 区域

- `title`：每个页面单独设置，准确描述页面主题，不要整站共用一个标题。
- `meta description`：用于帮助生成搜索摘要，重点是概括页面价值，不是机械重复关键词。
- `canonical`：有分页、参数、重复内容、移动版/PC 版共存时要明确规范地址。
- `robots`：仅在确实需要控制收录或展示时使用，避免误写成 `noindex`。
- `lang`：中文站点建议使用 `zh-CN`，便于语言识别。
- `favicon`：Google 明确会使用站点图标；图标应稳定、可抓取、与站点品牌一致。

### 3.2 `body` 区域

- 一个页面只保留一个主 `h1`，对应页面中心主题。
- 用 `header`、`nav`、`main`、`article`、`section`、`footer` 明确语义区块。
- 标题层级按 `h1 -> h2 -> h3` 顺序使用，不跳级、不把标题标签只当样式用。
- 正文区必须有可抓取文本，不要让核心内容只存在于图片、Canvas 或延迟脚本里。
- 导航、面包屑、相关推荐要使用真实可抓取链接，不要只用点击事件跳转。
- 图片必须有 `alt`，内容图说明图片信息，装饰图可留空值 `alt=""`。

### 3.3 URL 与内部链接

- URL 保持短、稳定、可读，避免无意义参数。
- 同一内容尽量只有一个可收录 URL。
- 重要页面要能从首页、栏目页、正文页被多层次内部链接到。
- 面包屑建议始终保留，利于用户和搜索引擎理解层级。

## 4. 页面内容层面的 SEO 规范

- 标题、摘要、`h1`、正文首段要围绕同一个主题展开。
- 页面必须回答用户问题，不能只有营销口号。
- 内容尽量体现作者、机构、联系方式、更新时间、引用来源。
- 列表页要有列表页价值，详情页要有详情页价值，避免大规模薄内容。
- 不要采集拼接、伪原创、隐藏文字、桥页、关键词堆砌。
- 避免标题党。搜索结果标题和落地页主题必须一致。

## 5. Google SEO 重点

Google 搜索中心公开文档的重点可以概括为下面几项。

### 5.1 可抓取与可渲染

- 允许 Googlebot 访问关键 CSS、JS、图片等资源。
- 站点导航和正文链接尽量使用标准 `<a href="">`。
- JavaScript 页面也能被索引，但 Google 明确建议保证重要内容、链接和元信息可被渲染后读取；对官网和内容页来说，SSR、SSG 或首屏输出完整 HTML 更稳。

### 5.2 标题与摘要

- Google 会自动生成标题链接，不一定完全采用 `title`。
- 页面标题要描述性强、唯一、贴合正文，不要在多个页面复用。
- 摘要通常来自页面内容或 `meta description`，因此正文首段也要写清主题。

### 5.3 规范化与重复内容

- 参数页、排序页、分页页、追踪页需要处理 canonical。
- 不想收录的页面，用 `noindex` 或访问控制；不要只依赖 `robots.txt`。

### 5.4 结构化数据

- 对文章、面包屑、组织、产品、FAQ 等页面类型，可使用 Schema.org 的 JSON-LD。
- 结构化数据必须和页面可见内容一致，不能标注页面上不存在的信息。

### 5.5 站点地图与移动体验

- 提供 `sitemap.xml`，持续更新重要 URL。
- Google 采用移动优先索引，移动端内容、标题、结构化数据、内部链接不能比桌面端少。
- 页面速度、稳定性、交互体验会影响整体搜索表现。

## 6. 百度 SEO 重点

百度搜索资源平台公开指南更强调内容质量、站点可访问性、链接提交、移动落地页体验和中文站点规范。

### 6.1 页面主题要清晰

- 百度明确强调页面标题应准确概括页面内容，避免标题与正文不一致。
- 页面主体内容要突出，广告、弹窗、下载干扰不能压过正文。
- 列表页、聚合页不能只有一组链接，最好补充栏目说明、筛选逻辑、推荐规则。

### 6.2 移动页体验

- 移动页可正常打开、首屏可见、字体可读、按钮可点、无强遮挡，是百度的重要基础要求。
- 避免频繁弹窗、强制登录、强制下载、正文需要多次跳转才能看到。

### 6.3 链接提交与死链处理

- 百度更依赖站长平台工具链，建议提交 `sitemap.xml`，并使用普通收录/快速收录等能力。
- 页面删除、改版后应及时处理死链并提交，避免大量失效 URL 长期留在索引中。

### 6.4 重复页与规范地址

- PC 与移动、带参数与不带参数、站内多入口重复页，需要明确首选 URL。
- 页面如果存在镜像、复制、拼接内容，更容易影响百度对整站质量判断。

### 6.5 中文内容质量

- 百度对中文语义、页面可读性、排版整洁度、信息可信度较敏感。
- 企业站建议补齐公司介绍、联系方式、备案信息、服务说明、案例或资质信息。

## 7. 百度与 Google 的差异理解

| 项目 | Google | 百度 |
| --- | --- | --- |
| 抓取与渲染 | 对 JavaScript 渲染支持更成熟，但仍建议输出稳定 HTML | 更适合直接输出完整 HTML，减少纯前端依赖 |
| 结构化数据 | 支持范围更系统，Search Console 生态更完整 | 也看重结构和语义，但更偏站点基础质量和中文内容 |
| 站长工具依赖 | 有帮助，但不是唯一入口 | 对站长平台、提交、死链处理、移动体验检测更依赖 |
| 内容侧重点 | 搜索意图匹配、页面唯一价值、结构化理解 | 中文页面质量、标题正文一致、落地页体验、站点可信度 |

结论：如果同时做 Google 和百度，最稳的方案是：

1. 服务端直接输出完整 HTML。
2. 每页独立 `title` / `description` / `canonical`。
3. 标准语义化标签和清晰标题层级。
4. 真实正文内容优先，少弹窗、少打断。
5. 建好 `robots.txt`、`sitemap.xml`、死链处理、站长平台提交。

## 8. 推荐的页面模板拆分

### 8.1 首页

- 只有一个 `h1`，明确品牌与主营业务。
- 首页首屏要直接出现核心服务说明，不要全是大图和口号。
- 首页要能清晰链接到核心栏目页和重点转化页。

### 8.2 栏目页 / 列表页

- 提供栏目简介，而不是只有卡片列表。
- 每个卡片标题都使用真实链接指向详情页。
- 支持分页时，分页 URL 要稳定可抓取。

### 8.3 详情页 / 文章页

- 标题、摘要、作者、发布时间、更新时间尽量完整。
- 正文开头先给结论，再展开说明。
- 增加相关文章、面包屑、上级栏目链接。

### 8.4 联系页 / 关于页

- 明确公司名称、业务范围、地址、电话、邮箱、营业信息。
- 这类页面对百度判断企业站可信度有帮助。

## 9. Nuxt 项目落地示例

如果项目使用 Nuxt，建议每个页面通过 `useSeoMeta` 或 `useHead` 输出 SEO 信息，而不是只在全局写死。

```ts
// pages/news/[slug].vue
const article = {
  title: '供应链金融产品介绍',
  summary: '介绍适用企业、额度范围、申请条件与常见问题。',
  cover: 'https://www.example.com/images/supply-chain.jpg',
  url: 'https://www.example.com/news/supply-chain'
}

useSeoMeta({
  title: `${article.title} - 融策贷`,
  description: article.summary,
  ogTitle: `${article.title} - 融策贷`,
  ogDescription: article.summary,
  ogImage: article.cover,
  ogUrl: article.url
})

useHead({
  link: [{ rel: 'canonical', href: article.url }]
})
```

同时保证页面模板中有明确的正文结构：

```vue
<template>
  <main>
    <article>
      <header>
        <h1>{{ article.title }}</h1>
        <p>更新时间：2026-03-16</p>
      </header>

      <section>
        <h2>产品概览</h2>
        <p>{{ article.summary }}</p>
      </section>
    </article>
  </main>
</template>
```

## 10. 最小检查清单

上线前至少检查下面 10 项：

1. 页面源码里能直接看到正文，而不是只有挂载节点。
2. 每个页面都有独立 `title` 和 `description`。
3. 重要页面存在 `canonical`。
4. 页面只有一个 `h1`。
5. 导航和正文链接都是真实 `a` 标签。
6. 图片有正确 `alt`。
7. `robots.txt` 与 `sitemap.xml` 可访问。
8. 移动端首屏可读，无强制弹窗遮挡正文。
9. 删除页面已返回正确状态码，并处理死链。
10. Google Search Console 和百度搜索资源平台都已提交站点。

## 11. 官方参考

- Google SEO Starter Guide: <https://developers.google.com/search/docs/fundamentals/seo-starter-guide>
- Google Search Essentials: <https://developers.google.com/search/docs/fundamentals/creating-helpful-content>
- Google JavaScript SEO Basics: <https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics>
- Google 控制标题链接: <https://developers.google.com/search/docs/appearance/title-link>
- Google 控制摘要: <https://developers.google.com/search/docs/appearance/snippet>
- Google Sitemap 概览: <https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview>
- Google 结构化数据简介: <https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data>
- 百度搜索资源平台文档中心: <https://ziyuan.baidu.com/college/docindex>
- 百度搜索优化指南 2.0: <https://ziyuan.baidu.com/college/articleinfo?id=2670>
- 百度搜索落地页体验白皮书 4.0: <https://ziyuan.baidu.com/college/articleinfo?id=3658>
- 百度搜索优质内容指南: <https://ziyuan.baidu.com/college/articleinfo?id=2727>
- 百度搜索资源平台首页: <https://ziyuan.baidu.com/>
