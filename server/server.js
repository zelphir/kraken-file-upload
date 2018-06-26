const path = require('path')
const app = require('./src/app')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const NODE_PORT = process.env.NODE_PORT || 5678

app.listen(NODE_PORT, () => {
  console.log(`Server listening on port ${NODE_PORT}!`) // eslint-disable-line
})
