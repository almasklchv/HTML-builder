const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const readableStream = fs.createReadStream(path.resolve(__dirname, 'text.txt'), {encoding: 'utf-8'});
readableStream.on('data', (chunk) => {
    stdout.write(chunk + '\n')
})