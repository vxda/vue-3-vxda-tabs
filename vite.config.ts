import * as path from 'path';
import typescript2 from 'rollup-plugin-typescript2';
import dts from 'vite-plugin-dts';
// import checker from 'vite-plugin-checker';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            // script: {
            //     propsDestructure: true,
            //     defineModel: true
            // }
        }),
        dts({
            insertTypesEntry: true,
        }),
        typescript2({
            check: false,
            include: ['./src/components/**/*.vue'],
            tsconfigOverride: {
                compilerOptions: {
                    outDir: 'dist',
                    sourceMap: true,
                    declaration: true,
                    declarationMap: true,
                },
            },
            exclude: ['vite.config.ts']
        }),
        // checker({
        //     typescript: true,
        // }),
    ],
    build: {
        cssCodeSplit: true,
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: 'src/lib.ts',
            name: 'vxdaTabs',
            formats: ['es', 'cjs', 'umd'],
            fileName: format => `vxda-tabs-ts.${format}.js`
        },
        rollupOptions: {
            // make sure to externalize deps that should not be bundled
            // into your library
            input: {
                main: path.resolve(__dirname, 'src/lib.ts')
            },
            external: ['vue'],
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'lib.css') return 'vxda-tabs-ts.css';
                    console.log('assetInfo.name', assetInfo.name);
                    return assetInfo.name;
                },
                exports: 'named',
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
});
