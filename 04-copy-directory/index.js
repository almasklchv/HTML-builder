const fs = require('fs');
const pathModule = require('path');

async function main() {
  const pathToDir = pathModule.resolve(__dirname, 'files-copy');
  try {
    const isExist = await fileAccess(pathToDir);
    if (isExist) {
      await rmdirAsync(pathToDir);
    }
    await mkdirAsync(pathToDir);
    const files = await readdirAsync(pathModule.resolve(__dirname, 'files'));
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await copyFileAsync(
        pathModule.resolve(__dirname, 'files', file),
        pathModule.resolve(pathToDir, file)
      );
    }
    console.log('Copying files completed!');
  } catch (err) {
    console.log(err);
  }
}

async function fileAccess(path) {
  return new Promise((resolve) => {
    fs.access(path, (err) => {
      if (err) {
        resolve(false);
      }
      resolve(true);
    });
  });
}

async function mkdirAsync(path) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, {recursive: true}, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

async function rmdirAsync(path) {
  return new Promise((resolve, reject) => {
    fs.rm(path, {recursive: true}, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

async function readdirAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err);
      }
      resolve(files);
    });
  });
}

async function copyFileAsync(src, dest) {
  return new Promise((resolve, reject) => {
    fs.copyFile(src, dest, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

main();
