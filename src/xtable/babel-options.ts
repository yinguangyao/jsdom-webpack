import type { TransformOptions } from '@babel/core';

const babelOptions: TransformOptions & { cacheDirectory?: boolean } = {
  sourceType: 'unambiguous',
  cacheDirectory: true,
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        loose: true,
        targets: ['> 0.5%, last 2 versions, not IE < 11', 'IE >= 11'],
        corejs: {
          version: 3,
          proposals: true,
        },
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: true,
        regenerator: false,
        useESModules: true,
        absoluteRuntime: false,
      },
    ],
  ],
};

export default babelOptions;
