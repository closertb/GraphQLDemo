const Router = require('koa-router')
const { compute } = require('./fork_compute');
const fileProcess = require('./file');
const deployProcess = require('./deploy');

const notFount = require('./404');
const helloworld = require('./helloworld');


const home = new Router();
// 子路由1
home.get('/', ( ctx )=>{
  let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404h</a></li>
      <li><a href="/page/compute">/page/compute</a></li>
    </ul>
  `
  ctx.body = html
})

function addTime(content) {
  return `${content}, the time is ${Date.now()}, the process pid is: ${process.pid}`
}
// 子路由2
const page = new Router()
page.get('/404', notFount)
  .get('/helloworld', helloworld)
  .get('/compute', async ( ctx )=>{
    const sum = compute();
    ctx.body = addTime(`Sum is ${sum}`);
  })
  .post('/create', fileProcess).post('/deploy', deployProcess);

module.exports = function router({ router, config, app }) {
/*   const logs = router
  .post('/root', (ctx, next) => {
    ctx.body = { username: 'yes' };
    return next;
  }); */
  router.use('/', home.routes(), home.allowedMethods());
  router.use('/page', page.routes(), page.allowedMethods());
};