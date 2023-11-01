const express = require('express')
const router = express.Router()
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication')

const {
  createSlot,
  getSlots,
  updateSlot,
  deleteSlot,
  getDailySlots,
  getWeeklySlots,
  getMonthlySlots,
  getSlotsInRange,
} = require('../controllers/slotsController')

router.post('/', authenticateUser, authorizePermissions('admin'), createSlot)
router.get('/', authenticateUser, authorizePermissions('admin'), getSlots)
router.patch(
  '/:id',
  authenticateUser,
  authorizePermissions('admin'),
  updateSlot
)
router.delete(
  '/:id',
  authenticateUser,
  authorizePermissions('admin'),
  deleteSlot
)

router.get('/daily', getDailySlots)
router.get('/weekly', getWeeklySlots)
router.get('/monthly', getMonthlySlots)
router.get('/range', getSlotsInRange)

module.exports = router
