const fs = require('fs');
const pathModule = require('path');

const displaySize = async (path) => {
    return new Promise((resolve, reject) => {
      fs.stat(path, (err, stats) => {
        if (err) {
          reject(err);
        }
        resolve(stats.size / 1024);
      });
    });
  };


async function readDir(path, options) {
    fs.readdir(path, options, (err, files) => {
       
        for (let i = 0; i < files.length; i++) {
            if (files[i].isFile()) {
                const pathToFile = pathModule.resolve(path, files[i].name);
                displaySize(pathToFile)
                  .then(fileSize => console.log(`${files[i].name.split('.')[0]} - ${files[i].name.split('.')[1]} - ${fileSize}kb`))
            } else if (options.showSubfolderContent === true) {
                readDir(pathModule.resolve(path, files[i].name), options)
            }
        }
    })
}

readDir(pathModule.resolve(__dirname, 'secret-folder'), {withFileTypes: true})