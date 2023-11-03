---
layout: home

title: JsBc Web
titleTemplate: JsBc Web Doc

hero:
  name: JsBc Web Doc
  text: 前端开发文档
  tagline: 基于 Vue3 + TS + Vite 开发
  image:
    src: /logo-with-shadow.png
    alt: Yt Vue UI
  actions:
    - theme: brand
      text: Get Started
      link: /components/features
    - theme: alt
      text: View on Gitee
      link: https://gitee.com/promiseW/vite-mock-project/
features:
  - icon: ⚡️
    title: 基于vitepress
    details: vite加持，即时服务器启动和闪电般快速的HMR，无论应用程序大小如何，都可以保持快速
  - icon: 🖖
    title: 主题定制
    details: 结合vitepress样式变量进行主题设计，改动样式变量即可定义自己的主题风格
  - icon: 🛠️
    title: DEMO注册
    details: 以Markdown为中心，vue的异步组件+动态组件完成DEMO引入演示
---

<script setup lang="ts">
import { onMounted } from 'vue'
import JsonCfg from '../package.json'

onMounted(() => {
  if (!JsonCfg.version) return
  const tagLineParagraph = document.querySelector('div.VPHero.has-image.VPHomeHero > div > div.main > p.tagline')
  const docsVersionSpan = document.createElement('samp')
  docsVersionSpan.classList.add('version-tag')
  docsVersionSpan.innerText = JsonCfg.version
  tagLineParagraph?.appendChild(docsVersionSpan)
})
</script>
