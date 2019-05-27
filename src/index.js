const { getAllData } = require('systeminformation')
const app = require('express')()

const { indentify } = require('../src/indentify');

var results = [];
const uniqueID = indentify();

function getSysInfo(){
  getAllData().then((value) => {
    results = value;
  }, (reason) => {
    results = [];
    console.log(reason);
  });
}

getSysInfo();

app.use('/', async (req, res) => {
  try {
    res.json({
      _id: uniqueID,
      timestamp: Math.floor(Date.now() / 1000),
      ...results
    })
  } catch (error) {
    res.end(error)
  }
})


export default app
