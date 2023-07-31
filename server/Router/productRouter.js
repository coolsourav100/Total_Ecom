const express = require('express')
const route = express.Router()
const productController = require('../Controller/productController') 

route.get('/allProduct', productController.allProduct)
route.post('/allProduct', productController.allProductPost)
route.get('/products/:id', productController.findProductById);

module.exports = route