const fs = require('fs');
const path = require('path');
const unzip = require('unzipper');

const dir = path.parse(process.cwd());

const rootPath = path.resolve(dir.dir, dir.base, '../static');

async function deployProcess(ctx, next) {
  const body = ctx.request.body;
  const file=ctx.request.files.file;

  if (!file) {
    ctx.body = JSON.stringify({ status: 'fail', message: 'file is needed', code: 502 });
    return;
  }
  const content = fs.createReadStream(file.path);
  // const target = fs.createWriteStream
  await next();
  console.log('path', rootPath, body);     

  const distFilePath = path.join(rootPath, file.name.replace(/\.[a-z-A-Z]+$/, ''));
  fs.exists(distFilePath, (isExist) => {
    console.log('is', isExist);
    if (!isExist) {
      fs.mkdirSync(distFilePath);
    }
    content
    .pipe(unzip.Extract({ path: distFilePath }));
   
    console.log('ok', file.name);  
  }); 
  ctx.body = JSON.stringify({ status: 'ok', code: 200 });
}

module.exports = deployProcess;