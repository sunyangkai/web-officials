# Nuxt 3 SSR 说明

这个项目是一个基于 `Nuxt 3 + Vue 3` 的服务端渲染官网。

当前包含两个页面：

- `/` 首页
- `/news` 新闻资讯页

其中新闻页的数据来自服务端接口 `/api/news`。

---

## 1. 什么是服务端渲染

服务端渲染，英文叫 `SSR`，意思是：

1. 浏览器先请求页面地址，例如 `/news`
2. Nuxt 服务端先执行页面逻辑
3. 服务端把页面 HTML 直接拼好返回给浏览器
4. 浏览器拿到的不是空壳，而是已经带内容的页面
5. 前端脚本再接管页面，让它变成可交互的 Vue 应用

和纯前端渲染相比，SSR 的区别是：

- 纯前端渲染：浏览器先拿到空的 HTML，再执行 JS，请求数据，再渲染内容
- SSR：浏览器第一次拿到的 HTML 里通常已经有内容

这对 SEO 更友好，因为爬虫直接访问 `/news` 时，返回的 HTML 里就已经有新闻标题和摘要。

---

## 2. 当前项目里的 SSR 流程

以访问 `/news` 为例。

### 第一步：浏览器请求页面

用户或爬虫访问：

```txt
/news
```

请求会先到 Nuxt 服务端，而不是先在浏览器里执行 Vue。

### 第二步：服务端执行页面代码

新闻页文件是：

- [pages/news.vue](c:/Users/Administrator/sunyk/web-officials/pages/news.vue)

页面里使用了：

```ts
await useAsyncData('news-list', () => $fetch('/api/news'))
```

当这是一次服务端首屏请求时，`useAsyncData` 会在服务端先执行。

也就是说，Nuxt 在真正输出 HTML 之前，会先去请求：

```txt
/api/news
```

### 第三步：服务端接口返回新闻数据

接口文件是：

- [server/api/news.get.ts](c:/Users/Administrator/sunyk/web-officials/server/api/news.get.ts)

这个文件运行在服务端，它会：

1. 先检查是否配置了 `NEWS_API_URL`
2. 如果配置了，就请求真实新闻接口
3. 如果没有配置或者请求失败，就返回默认兜底数据

所以页面层并不直接关心真实数据源来自哪里，只关心 `/api/news` 的返回结构。

### 第四步：Nuxt 把数据和页面一起渲染

当 `/api/news` 返回数据后，Nuxt 会：

1. 把新闻数据传给 `pages/news.vue`
2. 用这些数据把模板渲染成完整 HTML
3. 把渲染结果返回给浏览器

所以浏览器第一次收到的 HTML 中，新闻标题、摘要、分类、日期通常都已经在页面源码里了。

---

## 3. 数据是怎么注入进页面的

这是最关键的部分。

### 3.1 `useAsyncData` 的作用

在新闻页里：

```ts
const {
  data: newsList,
  error,
  pending,
  refresh
} = await useAsyncData('news-list', () => $fetch('/api/news'), {
  server: true,
  lazy: false,
  default: () => [],
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  }
})
```

这里做了几件事：

1. `useAsyncData` 定义了一个异步数据源
2. key 是 `news-list`
3. 数据获取函数是 `() => $fetch('/api/news')`
4. `await` 表示服务端渲染时会等待数据拿到后再继续渲染页面

### 3.2 服务端阶段的数据注入

服务端请求 `/news` 时：

1. `useAsyncData` 在服务端执行
2. `$fetch('/api/news')` 拿到数据
3. Nuxt 用这份数据生成 HTML
4. 同时把这份数据放进 Nuxt 的 `payload`

这个 `payload` 可以理解成：

- 一份给客户端复用的首屏数据快照

它会跟着页面一起下发给浏览器。

### 3.3 客户端接管时不会重复请求

浏览器拿到 SSR HTML 后，前端脚本会开始 hydration。

hydration 可以理解成：

- “把已经显示出来的 HTML，和 Vue 组件重新关联起来”

这时 Nuxt 会优先读取服务端已经注入的 `payload` 数据，而不是立刻重新请求 `/api/news`。

这就是为什么：

- 直接打开 `/news`
- 或者爬虫直接抓取 `/news`

都能拿到服务端已经渲染好的内容。

---

## 4. 为什么站内点击跳转时还可能请求接口

这是 SSR 和 SPA 混合模式里最容易混淆的地方。

### 直接访问 `/news`

流程是：

1. 浏览器请求服务端
2. 服务端先拿新闻数据
3. 服务端输出带内容的 HTML

这个过程是 SSR。

### 从首页点击跳到 `/news`

如果是 `NuxtLink` 正常跳转，那么这是客户端路由切换。

这时：

1. 浏览器不会整页刷新
2. 但客户端需要拿到 `/news` 页面对应的数据
3. 所以 `useAsyncData` 会在客户端执行一次数据请求

这不是 SSR 失效，而是 Nuxt 正常行为。

原因很简单：

- 客户端无刷新跳转时，没有新的服务端 HTML 返回
- 那就只能由客户端自己把页面数据拿回来

所以你可以把 Nuxt 理解成：

- 首次访问页面时优先 SSR
- 站内路由切换时优先 SPA

这是现代 Nuxt 的标准模式。

---

## 5. 为什么这种方式对 SEO 足够友好

搜索引擎抓取 `/news` 时，通常关注的是：

1. 是否能从首页发现 `/news` 链接
2. 直接请求 `/news` 时，返回的 HTML 里有没有正文内容
3. 页面标题和描述是否明确

而当前项目满足：

1. 首页有到新闻页的链接
2. `/news` 是 SSR 页面
3. 新闻数据在服务端先拿到再输出 HTML
4. 页面配置了 `useSeoMeta`

所以对于抓取新闻列表页的核心信息，这个方案是成立的。

---

## 6. 当前项目涉及的关键文件

- [nuxt.config.ts](c:/Users/Administrator/sunyk/web-officials/nuxt.config.ts)
  - Nuxt 全局配置
  - 配置了 `runtimeConfig`

- [pages/news.vue](c:/Users/Administrator/sunyk/web-officials/pages/news.vue)
  - 新闻页组件
  - 通过 `useAsyncData` 获取新闻数据

- [server/api/news.get.ts](c:/Users/Administrator/sunyk/web-officials/server/api/news.get.ts)
  - 服务端新闻接口
  - 负责对接真实接口或返回兜底数据

- [layouts/default.vue](c:/Users/Administrator/sunyk/web-officials/layouts/default.vue)
  - 站点全局布局
  - 提供首页和新闻页的导航入口

---

## 7. 一句话总结

当前新闻页的数据注入方式是：

1. 服务端先执行 `useAsyncData`
2. `useAsyncData` 在服务端请求 `/api/news`
3. 拿到数据后渲染 HTML
4. 同时把数据放进 Nuxt payload
5. 浏览器首屏直接看到内容
6. 客户端接管时复用 payload，避免首屏重复请求

如果后面要继续增强 SEO，下一步通常是增加：

- 新闻详情页
- `sitemap.xml`
- `robots.txt`
- canonical
- 结构化数据

---

## 8. SSR 工程里需要特别注意的点

服务端渲染不是“把页面放到服务端跑一下”这么简单，实际工程里有一些很关键的约束。

### 8.1 不要在服务端直接使用浏览器对象

SSR 执行时，代码运行在 Node.js 服务端，不是在浏览器里。

所以这些对象在服务端阶段不存在：

- `window`
- `document`
- `localStorage`
- `sessionStorage`
- `navigator`

如果在 `setup` 顶层直接使用它们，服务端渲染时就会报错。

正确做法通常是：

1. 放到 `onMounted` 里
2. 或者先判断 `import.meta.client`
3. 或者封装成只在客户端执行的逻辑

示例：

```ts
onMounted(() => {
  const token = localStorage.getItem('token')
})
```

而不是：

```ts
const token = localStorage.getItem('token')
```

### 8.2 避免服务端和客户端渲染结果不一致

SSR 最怕的问题之一是 hydration mismatch，也就是：

- 服务端生成的 HTML
- 和客户端接管后计算出来的 HTML

两边不一致。

常见触发原因：

- `Math.random()`
- `Date.now()`
- 直接用当前时间拼内容
- 服务端和客户端走了不同分支
- 列表 key 不稳定

例如：

```ts
const id = Math.random()
```

如果这个值直接参与渲染，服务端和客户端得到的结果不一样，就可能出现 hydration 警告。

正确思路是：

- 让渲染数据稳定
- 随机值、时间戳等在服务端提前算好并注入
- 或者只在客户端挂载后再处理

### 8.3 首屏数据要尽量在服务端准备好

对于 SEO 关键内容，不能依赖客户端再补。

例如新闻页的这些内容应该首屏就有：

- 页面标题
- 新闻标题
- 新闻摘要
- 分类
- 发布时间

如果这些要等浏览器执行 JS 后才出现，那么：

- SEO 效果会变差
- 首屏体验也会变差

所以对 SEO 敏感的页面，应该优先使用：

- `useAsyncData`
- `useFetch`
- 服务端接口

在 SSR 阶段把内容准备好。

### 8.4 区分“首屏 SSR”与“站内跳转 CSR”

Nuxt 是混合模式，不是全程都只有 SSR。

需要明确：

- 首次打开页面，通常是 SSR
- 站内通过 `NuxtLink` 切页，通常是 CSR

这会影响很多判断，比如：

- 为什么直接访问 `/news` 有 HTML 内容
- 为什么站内跳转时仍可能发接口请求
- 为什么某些逻辑只在第一次打开时执行

工程里要避免一个误区：

- 以为“用了 Nuxt”就意味着所有跳转都不需要客户端取数

实际上不是。只要是无刷新路由切换，客户端通常就要自己拿数据。

### 8.5 服务端接口要做好兜底和容错

SSR 页面如果依赖接口，而接口又不稳定，就会直接影响页面可用性。

在这个项目里：

- [server/api/news.get.ts](c:/Users/Administrator/sunyk/web-officials/server/api/news.get.ts)

已经做了这些处理：

1. 支持真实接口地址
2. 请求失败时回退到默认新闻数据
3. 对外部数据做结构归一化

这是 SSR 页面里很重要的工程习惯。

因为如果不做兜底，服务端一旦请求失败，页面很可能直接空白或报错。

### 8.6 不要把敏感逻辑直接暴露给客户端

SSR 有一个好处是：

- 可以把某些数据处理放在服务端
- 浏览器只能拿到结果，拿不到完整服务端实现

例如：

- 外部新闻接口地址
- 鉴权 token
- 服务端聚合逻辑
- 数据清洗逻辑

这些更适合放在：

- `server/api/*`
- `runtimeConfig`

而不是直接写到前端页面组件里。

注意：

- `runtimeConfig.public` 里的内容会下发到浏览器
- 非 `public` 配置只应该在服务端使用

### 8.7 注意缓存策略

SSR 页面每次都在服务端执行，意味着：

- 如果每次都实时请求远程接口，压力会比较大
- 接口响应慢会直接拖慢页面返回速度

因此在正式工程里要考虑：

- 服务端接口缓存
- CDN 缓存
- 页面缓存
- 数据更新频率

比如新闻列表页常见策略是：

1. 服务端接口先请求远程新闻源
2. 短时间内缓存结果
3. 页面读取缓存后的新闻数据

这样可以减少重复请求，提高响应速度。

### 8.8 SEO 不只看 SSR，还要看页面结构

SSR 只是 SEO 的基础，不是全部。

即使页面是 SSR，如果这些没做好，SEO 仍然一般：

- 没有独立 title
- 没有 description
- 没有规范 URL
- 页面内容过薄
- 没有内部链接
- 没有 sitemap

所以工程上通常需要一起考虑：

- `useSeoMeta`
- canonical
- `sitemap.xml`
- `robots.txt`
- 新闻详情页 URL 设计

### 8.9 列表页适合摘要，详情页适合承载正文

如果所有新闻只放在一个列表页里，搜索引擎能抓到的信息是有限的。

更合理的结构通常是：

1. `/news` 承载列表和摘要
2. `/news/[slug]` 承载单条新闻详情
3. 每条详情页输出独立的标题、描述和正文

这样对 SEO 更有利，也更符合内容型站点的结构。

### 8.10 监控构建和运行环境差异

有些代码在本地开发正常，但到了生产环境会出问题，常见原因包括：

- Node 版本不同
- 环境变量缺失
- 远程接口超时
- 构建环境权限不同
- 服务器时区不同

SSR 工程要特别注意：

- 开发环境通过，不代表生产一定通过
- 构建成功，不代表运行时一定稳定

所以通常还要验证：

1. `npm run build`
2. 生产产物启动是否正常
3. 真实环境接口是否可达
4. 服务端日志是否有异常

---

## 9. 这个项目后续值得继续补的方向

如果把这个项目作为正式官网继续做，比较值得优先补的内容有：

- 新闻详情页，形成 `/news/[slug]`
- `sitemap.xml`
- `robots.txt`
- canonical
- 结构化数据
- 服务端缓存
- 错误监控和访问日志
- 更明确的咨询转化入口
