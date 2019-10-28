
### 示例说明
本示例用于一步一步搞懂Node多进程
### 测试说明
 - npm run start // 体验单进程单线程，体验什么是阻塞
 - npm run fork // 体验用child_process开启fork进程来处理运算
 - npm run cluster // 体验用cluster自己开启多进程
 - pm2 start pm2.json // 体验pm2 辅助开启多进程来处理阻塞
> 使用pm2 测试的前提是你已经： npm install pm2 -g
### 那些命令行
 - pm2 start pm2.json // 启动
 - pm2 start pm2.json --no-daemon // 启动无守护进程模式，这种可以实时打印出console.log
 - pm2 logs
 - pm2 delete name
 - pm2 restart name
 - pm2 monit name