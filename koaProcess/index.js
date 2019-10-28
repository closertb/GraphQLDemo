require('colors'); // 给string 注入props
const AngelServer = require('./server/instance.js');
const path = require('path');

const angelServer = new AngelServer({
  routerUrl: path.join(process.cwd(), 'server/router.js'),//路由地址
  configUrl: path.join(process.cwd(), 'config/constants.js')  
  //默认读取config/config.default.js
});

//服务器优雅退出
angelServer.app.on('error', err => {
  angelServer.server.close(() => {
    //所有已有连接断开后，退出进程
    process.exit(1);
  });
  //5秒后退出进程
  timeout = setTimeout(() => {
    process.exit(1);
  },5000);
});
