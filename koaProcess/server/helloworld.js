const { date, addTime } = require('../config/constants');


module.exports = async (ctx, next)=>{
  ctx.body = addTime('helloworld page!');
  console.log('hello, date', date.getTime());
  await next();
}