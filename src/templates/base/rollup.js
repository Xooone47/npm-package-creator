/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const json = require('@rollup/plugin-json');
const esbuild = require('rollup-plugin-esbuild');
const dts = require('rollup-plugin-dts');
const alias = require('@rollup/plugin-alias');
// const alias = require('esbuild-plugin-alias');

const rimraf = require('rimraf');
// const childProcess = require('child_process');

// const execSync = childProcess.execSync;

// execSync('eslint --fix src/');


// 清理 dist 文件夹
rimraf.sync('dist');

const projectRootDir = path.resolve(__dirname);


const extensions = ['.js', '.ts'];

module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
        exports: 'auto',
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
      },
    ],
    plugins: [
      nodeResolve({
        extensions,
      }),
      alias({
        entries: {
          '@/': path.resolve(projectRootDir, 'src', '/'),
        },
      }),
      esbuild.default({
        include: /\.[jt]sx?$/,
        exclude: /node_modules/,
        sourceMap: true,
        minify: process.env.NODE_ENV === 'production',
        target: 'es2018',
        tsconfig: 'tsconfig.json',
        loaders: ['ts'],
      }),
      json(),
    ],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts.default()],
  }
];
