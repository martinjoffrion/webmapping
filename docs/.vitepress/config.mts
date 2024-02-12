import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Classification BD_Forêt",
  base: '/webmapping/',
  description: "Advanced Remote Sensing Project",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Project details', link: '/pre_process' },
      { text: 'Wepmapping', link: '/web_service_params' }
    ],

    sidebar: [
      {
        text: 'Project details',
        items: [
          { text: 'Pre-processing', link: '/pre_process' },
          { text: 'Sample Analysis', link: '/analyse_sample' },
          { text: 'Classification', link: '/classif_script' }
        ]
      },
      {
        text: 'Wepmapping',
        items: [
          { text: 'Generate Web-service', link: '/web_service_params' },
          { text: 'Create Leaflet map', link: '/leaf_map_script' },
          { text: 'Web Map', link: ' https://joffrion.alwaysdata.net/data/leaf_map.html' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
    
  },
  vite: {
    assetsInclude : "**/*.PNG"
  }

})

// Favicon ? ?npm i --save-dev @types/node?
// module.export = {
//   // ...
//   head: [
//     ['link', { rel: 'icon', type: 'image/x-icon', href: '/path/to/favicon.ico' }],
//     // ['link', { rel: 'icon', type: 'image/svg+xml', href: '/path/to/icon.svg' }], for svg
//   ],
//   // ...
// }
