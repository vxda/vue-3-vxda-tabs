import { App } from 'vue';
import * as components from './components';

const Library = {
    install(app: App) {
        for (const componentKey in components) {
            app.use((components as any)[componentKey]);
        }
    }
};

export default Library;

export * from './components';