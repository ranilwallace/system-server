const { getAllData } = require('systeminformation')
const { v4 } = require('uuid')
const app = require('express')()

app.use('/', async (req, res) => {
  try {
    const results = await getAllData()
    res.json({
      _id: v4(),
      timestamp: Math.floor(Date.now() / 1000),
      ...results
    })
  } catch (error) {
    res.end(error)
  }
})

export default app
