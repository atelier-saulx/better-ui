import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'
import postcssPresetEnv from 'postcss-preset-env'
import dts from 'rollup-plugin-dts'

const commonPlugins = [
  peerDepsExternal(),
  resolve(),
  typescript({
    useTsconfigDeclarationDir: true,
  }),
  commonjs(),
  postcss({
    inject: false,
    minimize: true,
    extract: 'index.css',
    plugins: [postcssPresetEnv()],
  }),
  json(),
]

export default [
  {
    input: 'src/index.ts',
    output: { dir: 'dist', format: 'esm' },
    plugins: [...commonPlugins, terser()],
  },
  {
    input: 'src/index.ts',
    output: { dir: 'dist', format: 'esm' },
    plugins: [...commonPlugins, dts()],
  },
]
