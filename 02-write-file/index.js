const fs = require('fs');
const path = require('path');
const readline = require('readline')
const { stdin, stdout } = process

stdout.write('Здравствуйте! Вводите текст, если хотите остановить ввод нажмите Ctrl + C или напишите exit в консоль\n')

fs.writeFile(path.resolve(__dirname, 'text.txt'), '', (err) => {
    if (err) {
        console.log(err)
    }
});

const rl = readline.createInterface({ 
    input: stdin, 
    output: stdout
})


rl.on('line', (input) => {
    if (input === 'exit') {
        console.log('Ввод в файл text.txt завершен!')
        process.exit()
    }
    fs.appendFile(path.resolve(__dirname, 'text.txt'), input+'\n', {encoding: 'utf-8'}, (err) => {
        if (err) {
            console.log(err)
        }
    })
}); 

process.on('beforeExit', () => {
    console.log('Ввод в файл text.txt завершен!')
})

