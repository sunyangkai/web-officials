<script setup lang="ts">
useSeoMeta({
  title: '首页 | 融策贷',
  description: '为企业与个体经营者提供高效率、低门槛、可定制的金融贷款服务。'
})

const advantages = [
  {
    title: '智能匹配方案',
    text: '依据企业流水、纳税、开票与征信情况，快速筛选更合适的贷款产品。'
  },
  {
    title: '全流程顾问服务',
    text: '从资料梳理到审批跟进，提供一对一融资顾问，减少反复沟通成本。'
  },
  {
    title: '多场景金融支持',
    text: '覆盖周转贷、经营贷、抵押贷与供应链融资，兼顾短期资金与长期扩张。'
  }
]

const products = [
  {
    name: '企业经营贷',
    desc: '适用于扩大经营、补充流动资金、采购备货等经营场景。'
  },
  {
    name: '发票税贷',
    desc: '基于纳税与开票数据进行授信，审批效率高，资料结构相对清晰。'
  },
  {
    name: '供应链融资',
    desc: '围绕核心企业订单与应收账款，为上下游企业提供资金支持。'
  }
]

const processSteps = [
  {
    step: '01',
    title: '需求评估',
    text: '结合经营周期、资金用途与还款能力，明确融资目标和期限结构。'
  },
  {
    step: '02',
    title: '资料梳理',
    text: '提前整理企业基础资料、流水、纳税与开票数据，减少重复补件。'
  },
  {
    step: '03',
    title: '产品匹配',
    text: '根据企业画像筛选贷款路径，兼顾额度、利率、期限与放款效率。'
  },
  {
    step: '04',
    title: '审批跟进',
    text: '跟进授信审批、反馈风控意见，并针对节点补充说明材料。'
  }
]

const faqs = [
  {
    question: '哪些企业适合申请经营贷款？',
    answer: '有稳定经营记录、清晰资金用途、可提供流水或纳税数据的企业，更容易获得合适授信。'
  },
  {
    question: '新闻资讯页的数据可以接真实接口吗？',
    answer: '可以。服务端接口已经预留环境变量配置，后续只需提供真实接口地址即可切换。'
  },
  {
    question: '首页是否支持继续扩展表单和案例展示？',
    answer: '支持。当前结构已经拆分清晰，可继续增加客户案例、在线咨询和意向收集模块。'
  }
]
</script>

<template>
  <div>
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <p class="eyebrow">金融贷款官网</p>
          <h1>为增长中的企业，配置更稳健的融资路径</h1>
          <p class="hero-text">
            融策贷专注金融贷款服务，以顾问式方案帮助企业和经营者提升融资效率，缩短审批周期，降低信息不对称带来的成本。
          </p>
          <div class="hero-actions">
            <NuxtLink to="/news" class="btn btn-primary">查看新闻资讯</NuxtLink>
            <a href="#products" class="btn btn-secondary">了解贷款方案</a>
          </div>
          <div class="trust-strip">
            <span>聚焦企业融资顾问服务</span>
            <span>支持 SSR 搜索引擎收录</span>
            <span>新闻页支持真实接口接入</span>
          </div>
        </div>

        <div class="hero-panel">
          <p class="panel-label">核心指标</p>
          <div class="metric-list">
            <article>
              <strong>12h</strong>
              <span>最快初步响应</span>
            </article>
            <article>
              <strong>30+</strong>
              <span>合作金融产品方向</span>
            </article>
            <article>
              <strong>1对1</strong>
              <span>融资顾问跟进</span>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-tight">
      <div class="container highlight-banner">
        <div>
          <p class="eyebrow">资金方案</p>
          <h2>从短期周转到长期扩张，融资决策需要更完整的信息面</h2>
        </div>
        <p>
          通过企业经营数据、行业周期和资金用途的综合判断，建立更清晰的贷款申请路径，避免盲目申请造成查询次数增加与审批效率下降。
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">服务优势</p>
          <h2>让贷款申请回到业务本身</h2>
        </div>
        <div class="card-grid">
          <article v-for="item in advantages" :key="item.title" class="info-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="products" class="section section-alt">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">贷款产品</p>
          <h2>覆盖常见融资场景</h2>
        </div>
        <div class="product-list">
          <article v-for="product in products" :key="product.name" class="product-card">
            <h3>{{ product.name }}</h3>
            <p>{{ product.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">融资流程</p>
          <h2>四步推进，减少无效沟通</h2>
        </div>
        <div class="process-grid">
          <article v-for="item in processSteps" :key="item.step" class="process-card">
            <span class="process-step">{{ item.step }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container cta-panel">
        <div>
          <p class="eyebrow">立即咨询</p>
          <h2>需要搭建更完整的贷款官网，也可以继续扩展表单、案例和详情页</h2>
          <p class="section-text">
            当前官网已经具备首页展示、新闻资讯、服务端渲染和接口取数能力，适合作为正式项目基础版本继续迭代。
          </p>
        </div>
        <div class="cta-actions">
          <a href="tel:400-800-6868" class="btn btn-primary">电话咨询</a>
          <NuxtLink to="/news" class="btn btn-secondary">查看资讯动态</NuxtLink>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">常见问题</p>
          <h2>上线前后常见的几个关注点</h2>
        </div>
        <div class="faq-list">
          <article v-for="item in faqs" :key="item.question" class="faq-card">
            <h3>{{ item.question }}</h3>
            <p>{{ item.answer }}</p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
