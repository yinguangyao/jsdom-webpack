import type { Configuration } from 'webpack';
import webpack from 'webpack';
import webpackConfig from './config';
import type { IBuildOptions } from './interface';
import { Platform } from './interface';

class TencentDocBuild {
  /**
   * 构建动态参数, 从构建命令中传递到构建流程
   */
  private options: IBuildOptions;
  /**
   * 前置构建的配置, 比如 lib 文件复制到发布目录等
   */
  private preWorkConfig: Configuration;
  /**
   * 资源入口打包配置
   */
  private webpackConfig: Configuration;
  private generateSsrWebpackConfig: Configuration;

  public constructor() {
    this.options = {
      // 从构建命令中获取构建动态参数
      platform: (process.env.PLATFORM as Platform) || Platform.all,
      isAnalyze: process.env.ANALYZE === 'true',
    };

    this.webpackConfig = webpackConfig(this.options);
  }

  public build() {
    this.beforeBuild();

    this.distBuild();
  }

  private beforeBuild() {
    console.log('当前构建端:', this.options.platform);
  }

  private distBuild() {
    const compiler = webpack([this.preWorkConfig, this.webpackConfig].filter((c) => !!c));
    compiler.run(this.logStats.bind(this));
  }

  private logStats(err: Error | undefined | null, stats: any) {
    if (!err) {
      console.log(
        stats.toString({
          all: false,
          assets: true,
          chunks: true,
          errors: true,
          errorDetails: false,
          warnings: false,
          timings: false,
          colors: true,
        }),
      );
    } else {
      console.error(err);
    }
  }
}

const tencentDocBuild = new TencentDocBuild();
tencentDocBuild.build();
