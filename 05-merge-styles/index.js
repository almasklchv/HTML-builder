const fs = require('fs');
const pathModule = require('path');

async function main(path) {
    const pathToBundle = pathModule.resolve(__dirname, 'project-dist', 'bundle.css');
    try {
        const isExist = await fileAccess(pathToBundle);
        if (isExist) {
            writeFileAsync(pathToBundle, '');
        }
        readdirAsync(path)
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (!data[i].isFile() && data[i].name !== 'project-dist') {
                    main(pathModule.resolve(path, data[i].name));
                } else {
                    if (data[i].name.split('.')[1] === 'css') {
                        const pathToFile = pathModule.resolve(path, data[i].name);
                        readFileAsync(pathToFile)
                        .then(data => {
                            appendFileAsync(pathToBundle, data);
                        })
                    }
                }
            }
        })
    } catch (err) {
        console.log(err)
    }
}

async function readdirAsync(path) {
    return new Promise((resolve, reject) => {
      fs.readdir(path, {withFileTypes: true}, (err, files) => {
        if (err) {
          reject(err);
        }
        resolve(files);
      });
    });
}

async function readFileAsync(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, {encoding: 'utf-8'}, (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data)
        })
    })
}

async function writeFileAsync(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            if (err) {
                reject(err);
            }
            resolve()
        })
    })
}

async function appendFileAsync(path, data) {
    return new Promise((resolve, reject) => {
        fs.appendFile(path, data, (err) => {
            if (err) {
                reject(err)
            }
            resolve()
        })
    })
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

main(pathModule.resolve(__dirname, "styles"))