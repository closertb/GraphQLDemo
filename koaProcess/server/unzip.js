const fs = require('fs');
const path = require('path');
const unzip = require('unzipper');

const dir = path.parse(process.cwd());

const rootPath = path.resolve(dir.dir, dir.base, 'static');

 const zipstream = fs.createReadStream(path.join(rootPath, '20190520.zip')); // `${file.name}`

// const fileStream = fs.createWriteStream(path.join(rootPath, 'target'));

  zipstream
  .pipe(unzip.Extract({ path: rootPath }));

  console.log('end');