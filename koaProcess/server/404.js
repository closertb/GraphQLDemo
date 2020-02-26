const { date, addTime } = require('../config/constants');

module.exports = async (ctx, next)=>{
  ctx.body = addTime('404 page!');
  console.log('date', date.getTime());
  await next();
}