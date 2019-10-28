require('colors'); // 给string 注入props
const cluster = require('cluster');
const { cpus } = require('os'); 
const AngelServer = require('./server/instance.js');
const path = require('path');
const cpusNum = cpus().length;

/**
 * 执行过程: node server.js
 * 首次cluster.isMaster为true, 然后fork了四个线程；
 * 接着每个启动，又重头执行，但这时cluster.isMaster为false了
 * 所以就实例化了四个服务AngelServer
 */

//超时
const timeout = null;

// console.log('start', cluster.isWorker, cluster.isMaster ? 'master' : 'fork');
//master进程
if(cluster.isMaster) {
  //fork多个工作进程
  for(let i = 0; i < cpusNum; i++) {
    creatServer();
  }
} else {
  //worker进程
  const angelServer = new AngelServer({
    routerUrl: path.join(process.cwd(), 'server/router.js'),//路由地址
    configUrl: path.join(process.cwd(), 'config/constants.js')  
    //默认读取config/config.default.js
  });

  //服务器优雅退出
  angelServer.app.on('error', err => {
    //发送一个自杀信号
    process.send({ act: 'suicide' });
    cluster.worker.disconnect();
    angelServer.server.close(() => {
      //所有已有连接断开后，退出进程
      process.exit(1);
    });
    //5秒后退出进程
    timeout = setTimeout(() => {
      process.exit(1);
    },5000);
  });
}

// master.js
//创建服务进程  
function creatServer() {
  const worker = cluster.fork();
  console.log(`工作进程已经重启pid: ${worker.process.pid}`);
  //监听message事件，监听自杀信号，如果有子进程发送自杀信号，则立即重启进程。
  //平滑重启 重启在前，自杀在后。
  worker.on('message', (msg) => {
    //msg为自杀信号，则重启进程
    if(msg.act == 'suicide') {
      creatServer();
    }
  });

  //清理定时器。
  worker.on('disconnect', () => {
    clearTimeout(timeout);
  });
}