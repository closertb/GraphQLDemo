const Router = require('koa-router')

const home = new Router();
// 子路由1
home.get('/', ( ctx )=>{
  let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `
  ctx.body = html
})

// 子路由2
const page = new Router()
page.get('/404', async ( ctx )=>{
  ctx.body = '404 page!'
}).get('/helloworld', async ( ctx )=>{
  ctx.body = 'helloworld page!'
})

module.exports = function router({ router, config, app }) {
/*   const logs = router
  .post('/root', (ctx, next) => {
    ctx.body = { username: 'yes' };
    return next;
  }); */
  router.use('/', home.routes(), home.allowedMethods());
  router.use('/page', page.routes(), page.allowedMethods());
};