const connect2Mongo = require('./db');
const express = require('express')
var cors = require('cors')

connect2Mongo();
const app = express()
app.use(cors())
const port =  process.env.BASE_URL 

app.use(express.json())
app.use(cors())


// Available Routes
app.use('/api', require('./backend/routes/profile'))


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})