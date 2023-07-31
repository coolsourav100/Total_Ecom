const express = require('express')
const route = express.Router()
const silderController = require('../Controller/silderController') 

route.get('/allSlider', silderController.allSlider)
route.post('/allSlider', silderController.allSliderPost)

module.exports = route