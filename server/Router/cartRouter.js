const express = require('express');
const route = express.Router()
const cartContrller = require('../Controller/cartController')

route.post('/update',cartContrller.updateCartData)
route.get('/get',cartContrller.getCartData)

module.exports = route