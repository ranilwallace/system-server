const { getAllData } = require('systeminformation')
const app = require('express')()

const { identify } = require('../src/identify');

app.use('/', async (req, res) => {
  const uniqueID = await identify();
  try {
    const results = await getAllData();
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
