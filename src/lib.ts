import { type App } from 'vue';

import * as components from './components';

const VxdaTabsLibrary = {
    install(app: App) {
        // Auto import all components
        for (const componentKey in components) {
            app.use((components as any)[componentKey]);
        }
    }
};

export default VxdaTabsLibrary;

// export all components as vue plugin
export * from './components';