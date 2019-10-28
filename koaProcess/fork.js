require('colors'); // 给string 注入props
const http = require('http');
const fork = require('child_process').fork;
const port = 3000;

const server = http.createServer((req, res) => {
    console.log('req', req.url);
    if(req.url == '/page/compute'){
      const compute = fork('./server/fork_compute.js');
        compute.send('开启一个新的子进程');

        // 当一个子进程使用 process.send() 发送消息时会触发 'message' 事件
        compute.on('message', sum => {
            res.end(`Sum is ${sum}`);
            compute.kill();
        });

        // 子进程监听到一些错误消息退出
        compute.on('close', (code, signal) => {
            console.log(`收到close事件，子进程收到信号 ${signal} 而终止，退出码 ${code}`);
            compute.kill();
        });
        console.log('end');
    }else{
        res.end(`ok, the time is ${Date.now()}`);
    }
});

server.listen(port, '0.0.0.0', () => {
    console.log(`当前服务器已经启动,请访问`,`http://127.0.0.1:${port}`.green);
});
