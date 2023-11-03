import { defineConfig } from 'vitepress'
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'

export default defineConfig({
  title: `JsBc Web Doc`,
  description: 'JsBc UI 组件库',
  base: '/jsbc-web-ui/',

  head: [ // 网站图标
    ['link', { rel: 'icon', type: 'image/svg+xml', href: 'logo.svg' }],
  ],
  appearance: true, // 默认 true，设为 false 则无法切换dark/light主题，可选 'dark' true false
  markdown: {
    lineNumbers: false, // 是否显示行数，默认false
    config: (md) => {
      md.use(demoblockPlugin)
    }
  },
  vite: {
    plugins: [demoblockVitePlugin()]
  },
  themeConfig: {
    logo: '/logo.svg',

    editLink: {
      pattern: 'https://gitee.com/promiseW/vite-mock-project',
      text: 'Suggest changes to this page',
    },
    // 默认支持icon包括：'discord'|'facebook'|'github'|'instagram'|'linkedin'|'mastodon'|'slack'|'twitter'|'youtube'
    socialLinks: [
      { icon: 'github', link: 'https://gitee.com/promiseW/vite-mock-project' },
      // 自定义icon
      // {
      //   icon: {
      //     svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Dribbble</title><path d="M12...6.38z"/></svg>'
      //   },
      //   link: 'https://www.npmjs.com/package/vue-list-table'
      // }
    ],

    search: { // vitepress 内置 search
      provider: 'local'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present The Muse Catcher',
    },

    nav: [
      { text: '组件', link: '/components/features', activeMatch: '/components/' },
      { text: '工具', link: '/utils/started', activeMatch: '/utils/' },
      {
        text: '链接',
        items: [
          { text: 'My GitHub', link: 'https://github.com/Promise-W' },
          {
            items: [
              {
                text: 'vue',
                link: 'https://cn.vuejs.org/',
              },
              {
                text: 'markdown',
                link: 'https://markdown.com.cn/',
              },
              {
                text: 'vitepress',
                link: 'https://vitepress.dev/',
              }
            ]
          }
        ]
      }
    ],

    sidebar: {
      '/components/': [
        {
          text: '指引',
          items: [
            {
              text: '特性',
              link: '/components/features'
            }
          ]
        },
        {
          text: '组件',
          items: [
            {
              text: '按钮 Button',
              link: '/components/Button'
            }
          ]
        }
      ],
      '/utils/': [
        {
          text: '指引',
          items: [
            {
              text: '快速上手',
              link: '/utils/started'
            }
          ]
        },
        {
          text: '工具',
          items: [
            {
              text: 'add 加法',
              link: '/utils/add'
            }
          ]
        }
      ]
    }
  }
})
