const date = (() => {
  console.log('init');
  return new Date();
})();

function addTime(content) {
  return `${content}, the time is ${Date.now()}, the process pid is: ${process.pid}`
}

module.exports = {
  date,
  addTime,
  listen: {
    port: 3000
  }
}