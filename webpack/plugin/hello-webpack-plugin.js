class HelloWebpackPlugin {
  apply(compiler) {
    console.log('hello aplly');
    compiler.hooks.done.tap('Hello World Plugin', (
      stats /* 在 hook 被触及时，会将 stats 作为参数传入。 */
    ) => {
      console.log('Hello World!');
    });
  }
}

module.exports = HelloWebpackPlugin;