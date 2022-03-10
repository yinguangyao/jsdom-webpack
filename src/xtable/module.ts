// @ts-ignore
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import getCSSModuleLocalIdent from 'react-dev-utils/getCSSModuleLocalIdent';
import babelOptions from './babel-options';
import type { IBuildOptions } from './interface';

const lessModuleRegex = /\.module\.less$/;
const cssModuleRegex = /\.module\.css$/;

type Options = {
  sourceMap?: boolean;
  modules?: Record<string, unknown>;
};

/**
 * 获取项目构建 loader
 */
const getModule = ({ isProduction }: IBuildOptions) => {
  const getStyleLoaders = (cssOptions: Options, otherLoader?: string) => {
    const loaders = [
      // 生产环境用 MiniCssExtractPlugin 来提取 css 文件
      // 开发环境用style-loader把css转换成js module，这个支持 css 的热更新
      isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
      {
        loader: 'css-loader',
        options: cssOptions,
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
    ].filter(Boolean);
    if (otherLoader) {
      loaders.push({
        loader: otherLoader,
        options: {
          sourceMap: true,
        },
      });
    }
    return loaders;
  };

  return {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
        ],
        exclude: [/node_modules/],
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.css$/,
        exclude: cssModuleRegex,
        use: getStyleLoaders({
          sourceMap: true,
        }),
      },
      {
        test: cssModuleRegex,
        use: getStyleLoaders({
          sourceMap: true,
          modules: {
            getLocalIdent: getCSSModuleLocalIdent,
          },
        }),
      },
      {
        test: /\.less$/,
        exclude: lessModuleRegex,
        use: getStyleLoaders(
          {
            sourceMap: true,
          },
          'less-loader',
        ),
      },
      {
        test: lessModuleRegex,
        use: getStyleLoaders(
          {
            sourceMap: true,
            modules: {
              getLocalIdent: getCSSModuleLocalIdent,
            },
          },
          'less-loader',
        ),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              disable: true, // !isProduction, 尝试解决 oci 报错问题
              limit: 10000,
              fallback: 'file-loader',
              // 用于 file-loader 的配置
              name: isProduction ? `[name]-[contenthash:10].[ext]` : '[name].[ext]',
              outputPath: 'image',
            },
          },
        ],
      },
      {
        test: /locales/,
        loader: '@tencent/i18next-loader',
        options: { basenameAsNamespace: true, includeNS: ['smartsheet'] },
      },
      {
        test: /\.json$/,
        use: ['raw-loader'],
        type: "javascript/auto" as "javascript/auto",
      },
    ],
  };
};

export default getModule;
