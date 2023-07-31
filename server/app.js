const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const productRouter = require('./Router/productRouter')
const cartRouter = require('./Router/cartRouter')
const silderRouter = require('./Router/sliderRoute')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use('/product', productRouter)
app.use('/cart', cartRouter)
app.use('/silder', silderRouter)

mongoose.connect(`mongodb+srv://@cluster1.syv6z7h.mongodb.net/total?retryWrites=true&w=majority`).then(() => {

  app.listen(4000, () => {
    console.log('server running on 4000 and DB connected')
  })
}).catch(err => {
  console.log('server not responding ...', err)
})
