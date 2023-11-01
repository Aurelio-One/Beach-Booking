const Reservation = require('../models/Reservation')
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')
const sendEmail = require('../services/mailservice')
const Slot = require('../models/Slot')

const bookSlot = async (req, res) => {
  const slotId = req.params.slotId
  const userId = req.user.userId
  const userEmail = req.user.email

  const existingReservation = await Reservation.findOne({ slotId })
  if (existingReservation) {
    throw new CustomError.BadRequestError('Slot already booked')
  }

  const reservation = new Reservation({ slotId, userId })
  await reservation.save()
  await Slot.findByIdAndUpdate(slotId, { isBooked: true })

  await sendEmail(
    userEmail,
    'Confirmation de réservation',
    'Votre réservation a bien été prise en compte. Merci!'
  )

  res.status(StatusCodes.OK).json({ msg: 'Slot booked successfully' })
}

const cancelBooking = async (req, res) => {
  const userId = req.user.userId
  const slotId = req.params.slotId
  const userEmail = req.user.email

  const reservation = await Reservation.findOne({ userId, slotId })

  if (!reservation) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'No reservation found for this slot by the user' })
  }

  await Reservation.deleteOne({ userId, slotId })

  await sendEmail(
    userEmail,
    "Confirmation d'annulation",
    'Votre réservation a bien été annulée. Merci!'
  )

  res.status(StatusCodes.OK).json({ msg: 'Reservation cancelled successfully' })
}

const getReservationHistory = async (req, res) => {
  try {
    const userId = req.user.userId

    const reservations = await Reservation.find({ userId: userId })
      .sort({ date: -1 })
      .populate('slotId')

    res.status(StatusCodes.OK).json(reservations)
  } catch (error) {
    console.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: 'An error occured when trying to retrieve the reservations history',
    })
  }
}

module.exports = {
  bookSlot,
  cancelBooking,
  getReservationHistory,
}
