const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  res.send('get all bookings')
})
router.post('/', function (req, res, next) {
  res.send('create a booking')
})
router.put('/:id', function (req, res, next) {
  res.send('edit a booking')
})
router.delete('/:id', function (req, res, next) {
  res.send('delete a booking')
})

module.exports = router
