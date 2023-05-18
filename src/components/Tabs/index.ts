import { type App, type Plugin } from 'vue';

import Tabs from './Tabs.vue';
import TabsItem from './TabsItem.vue';

export default {
    install(Vue: App) {
        Vue.component(Tabs.name, Tabs);
        Vue.component(TabsItem.name, TabsItem);
    }
} as Plugin;

export {
    Tabs as VxdaTabs,
    TabsItem as VxdaTabsItem
};