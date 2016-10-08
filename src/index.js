// @flow

import addAllAssetsToCompilation from './addAllAssetsToCompilation';

import type {
  Callback,
  AssetType,
  ArrayOfAssetsType,
  WebpackCompilerType,
  WebpackCompilationType,
} from '../types';

export default class AddAssetHtmlPlugin {
  assets: ArrayOfAssetsType;

  constructor(assets: ArrayOfAssetsType | AssetType | Object = []) {
    this.assets = Array.isArray(assets) ? assets.slice().reverse() : [assets];
  }

  /* istanbul ignore next: this would be integration tests */
  apply(compiler: WebpackCompilerType) {
    compiler.hooks.compilation.tap('AddAssetHtmlPlugin', (compilation: WebpackCompilationType) => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tapPromise(
        'AddAssetHtmlPlugin',
        htmlPluginData =>
          addAllAssetsToCompilation(this.assets, compilation, htmlPluginData),
      );
    });
  }
}
