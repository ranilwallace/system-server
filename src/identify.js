const fs = require('fs');
var path = require('path');
const { v4 } = require('uuid')
const { promisify } = require('util');

const homedir = require('os').homedir();

const filePath = path.normalize(homedir + '/system-server/.uuid');

const fileExists = promisify(fs.exists);
const readFile = promisify(fs.readFile);
const mkDir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

module.exports.identify = async function(){
    const exists = await fileExists(filePath);
    if(exists){
        const file = await readFile(filePath);
        return file.toString();
    } else{
        var id = v4();
        await mkDir(homedir + '/system-server/')
        await writeFile(filePath, id);
        return id;
    }
}
