module.exports = class SpecailJsonPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    console.log('Specail aplly');      // 指定要附加到的事件钩子函数
    compiler.hooks.emit.tapAsync(
      'SpecailJsonPlugin',
      (compilation, callback) => {
        console.log('This is an example plugin!', compilation.chunks);
        console.log('Here’s the `compilation` object which represents a single build of assets:');

        // 使用 webpack 提供的 plugin API 操作构建结果
        // compilation.addModule(/* ... */);

        callback();
        console.log('done', 'SpecailJsonPlugin');
      }
    );
  }
}