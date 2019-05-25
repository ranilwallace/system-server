const fs = require('fs');
var path = require('path');
const { v4 } = require('uuid')

const homedir = require('os').homedir();

const filePath = path.normalize(homedir + '/system-server/.uuid');

function checkForUUID(){
    try {
        if (fs.existsSync(filePath)) {
            return true;
        } else{
            fs.mkdir(homedir + '/system-server/', err => { 
                if (err && err.code != 'EEXIST') throw err;
            });
            return false;            
        }
    } catch(err) {
        return false;
    }  
}

function getUUID(){
    return fs.readFileSync(filePath).toString();
}

function getUUIDPath(){
    return filePath;
}

function generateUUID(){
    var id = v4();
    fs.writeFile(filePath, id, function (err) {
        if (err) throw err;
    });
    return id;
}

function indentify(){
    if(checkForUUID()){
        return getUUID();
    } else{
        return generateUUID();
    }
}

module.exports = {
    checkForUUID,
    getUUID,
    getUUIDPath,
    indentify
}
