import vue from 'rollup-plugin-vue'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import babel from '@rollup/plugin-babel';
import typescript from "rollup-plugin-typescript2";
import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from '@rollup/plugin-commonjs';

const babelOptions = {
    babelHelpers: 'bundled'
}

export default [
    {
        input: 'src/index.ts',
        external: ['vue'],
        output: [
            {
                format: 'esm',
                file: 'dist/library.mjs',
                exports: 'named'
            },
            {
                format: 'cjs',
                file: 'dist/library.js',
                exports: 'named'
            }
        ],
        plugins: [
            vue(), peerDepsExternal(), babel(babelOptions),
            typescript({
                typescript: require('typescript')
            }),
            nodeResolve({
                extensions: ['.vue', '.ts']
            }),
            cjs()
        ]
    }
]