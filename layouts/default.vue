<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="container nav-wrap">
        <NuxtLink to="/" class="brand">
          <span class="brand-mark">R</span>
          <div>
            <strong>融策贷</strong>
            <p>Finance & Loan Solutions</p>
          </div>
        </NuxtLink>

        <nav class="nav">
          <NuxtLink to="/" class="nav-link">首页</NuxtLink>
          <NuxtLink to="/news" class="nav-link">新闻资讯</NuxtLink>
        </nav>

        <a href="tel:400-800-6868" class="header-cta">融资咨询 400-800-6868</a>
      </div>
    </header>

    <main>
      <slot />
    </main>

    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <strong>融策贷</strong>
          <p>聚焦金融贷款、企业融资与顾问式解决方案。</p>
        </div>
        <div>
          <p>咨询热线：400-800-6868</p>
          <p>服务方向：企业贷 / 经营贷 / 税贷 / 供应链融资</p>
          <p>工作时间：周一至周日 09:00 - 21:00</p>
        </div>
      </div>
    </footer>
  </div>
</template>
