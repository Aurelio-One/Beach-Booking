const express = require('express')
const router = express.Router()
const { authenticateUser } = require('../middleware/authentication')
const {
  getReservationHistory,
} = require('../controllers/reservationsController')

const {
  bookSlot,
  cancelBooking,
} = require('../controllers/reservationsController')

router.post('/book/:slotId', authenticateUser, bookSlot)
router.delete('/cancel/:slotId', authenticateUser, cancelBooking)
router.get('/history', authenticateUser, getReservationHistory)

module.exports = router
