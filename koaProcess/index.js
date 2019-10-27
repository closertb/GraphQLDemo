const http = require('http');
const fork = require('child_process').fork;
const { compute } = require('./fork_compute'); 
const port = 8080;

const getRes = () =>  new Promise((res) => {
  setTimeout(() => {
    const sum = compute();
    res(sum);
  }, 0)
})

const server = http.createServer((req, res) => {
    console.log('req', req.url);
    if(req.url == '/compute'){
/*       const compute = fork('./fork_compute.js');
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
        }) */
        getRes().then(sum => {
          res.end(`Sum is ${sum}, the time is ${Date.now()}`)
        })
        console.log('end');
    }else{
        res.end(`ok, the time is ${Date.now()}`);
    }
});

server.listen(port, '0.0.0.0', () => {
    console.log(`server started at http://127.0.0.1:${port}`);
});
