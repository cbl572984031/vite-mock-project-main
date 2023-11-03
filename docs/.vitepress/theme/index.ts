import DefaultTheme from 'vitepress/theme'
import './global.styl' // global less
import './element.css' // element官网演示css，包含更多样式
import 'element-plus/dist/index.css'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'

export default {
  extends: DefaultTheme, // or ...DefaultTheme
  enhanceApp ({ app }) {
    app.use(ElementPlus, { locale: zhCn })
    app.component('Demo', Demo)
    app.component('DemoBlock', DemoBlock)
  }
}
