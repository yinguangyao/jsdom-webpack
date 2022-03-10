import path from 'path';
import webpack from 'webpack';
import type { Configuration } from 'webpack';
import type { IBuildOptions } from './interface';
import getModule from './module';

const appPath = path.resolve(__dirname, '../../');
/**
 * 获取 webpack 构建配置
 */
const getWebpackConfig = (options: IBuildOptions): Configuration => ({
  target: 'node',
  mode: 'production',
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },
  optimization: {
    minimize: false,
  },
  entry: {
    main: path.resolve(appPath, 'src/index.ts'),
  },
  output: {
    publicPath: '',
    path: path.resolve(appPath, 'dist'),
    filename: '[name].js',
    // library: {
    //   name: 'main',
    //   type: 'umd',
    //   export: 'default'
    // },
  },
  module: getModule(options),
  plugins: [
    new webpack.DefinePlugin({
      RUNTIME: '"server"',
    }),
    // new NodePolyfillPlugin(),
  ],
  externals: {
    canvas: {
      commonjs: 'canvas',
      commonjs2: 'canvas',
    }
  },
});

export default getWebpackConfig;
