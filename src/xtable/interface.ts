export enum Platform {
  pc = 'pc',
  mobile = 'mobile',
  pad = 'pad',
  all = 'all',
}

export interface IBuildOptions {
  /**
   * 构建是否为生产模式
   */
  isProduction?: boolean;
  /**
   * 构建环境
   */
  platform: Platform;
  /**
   * 是否进行打包分析
   */
  isAnalyze: boolean;
}
