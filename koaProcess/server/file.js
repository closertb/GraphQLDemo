const fs = require('fs');
const path = require('path');

async function FileProcess(ctx, next) {
  console.log('req', ctx.request.body);
  const { name, content } = ctx.request.body;
  await next();
  console.log('path', path.join(__dirname, `../static/${name}.txt`));
  await fs.writeFile(path.join(__dirname, `../static/${name}.txt`), content, () => {
    console.log('end', name);
  });
  ctx.body = JSON.stringify({ status: 'ok', code: 200 });
}

module.exports = FileProcess;