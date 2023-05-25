import {defineUserConfig, defaultTheme} from 'vuepress'

export default defineUserConfig({
    lang: 'en-US',
    title: 'Vue 3 - vxdaTabs',
    description: 'Simple Tabs component',
    base: '/vue-3-vxda-tabs/',
    theme: defaultTheme({
        sidebar: [
            {
                text: 'Introduction',
                link: '/'
            },
            {
                text: 'Components',
                link: '/components'
            },
            {
                text: 'Styling',
                link: '/styling'
            }
        ]
    }),
})