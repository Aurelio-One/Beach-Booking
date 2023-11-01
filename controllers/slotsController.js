const Slot = require('../models/Slot')
const { StatusCodes } = require('http-status-codes')

const createSlot = async (req, res) => {
  const { startDate, duration, instructor } = req.body
  const slot = await Slot.create({ startDate, duration, instructor })
  res.status(StatusCodes.CREATED).json({ slot })
}

const getSlots = async (req, res) => {
  const slots = await Slot.find({})
  res.status(StatusCodes.OK).json({ slots })
}

const updateSlot = async (req, res) => {
  const { id } = req.params
  const slot = await Slot.findByIdAndUpdate(id, req.body, { new: true })
  if (!slot) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'Slot not found' })
  }
  res.status(StatusCodes.OK).json({ slot })
}

const deleteSlot = async (req, res) => {
  const { id } = req.params
  await Slot.findByIdAndDelete(id)
  res.status(StatusCodes.OK).json({ msg: 'Slot deleted successfully' })
}

const getDailySlots = async (req, res) => {
  try {
    const date = new Date(req.query.date) // Format attendu : 'YYYY-MM-DD'
    const nextDay = new Date(date)
    nextDay.setDate(date.getDate() + 1)

    const slots = await Slot.find({
      startDate: {
        $gte: date,
        $lt: nextDay,
      },
    })

    res.status(StatusCodes.OK).json(slots)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error fetching daily slots' })
  }
}

const getWeeklySlots = async (req, res) => {
  try {
    const date = new Date(req.query.date)
    const endOfWeek = new Date(date)
    endOfWeek.setDate(date.getDate() + 7)

    const slots = await Slot.find({
      startDate: {
        $gte: date,
        $lt: endOfWeek,
      },
    })

    res.status(StatusCodes.OK).json(slots)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error fetching weekly slots' })
  }
}

const getMonthlySlots = async (req, res) => {
  try {
    const date = new Date(req.query.date)
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1)

    const slots = await Slot.find({
      startDate: {
        $gte: date,
        $lt: endOfMonth,
      },
    })

    res.status(StatusCodes.OK).json(slots)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error fetching monthly slots' })
  }
}
const getSlotsInRange = async (req, res) => {
  try {
    const startDate = new Date(req.query.startDate)
    const endDate = new Date(req.query.endDate)
    const slots = await Slot.find({
      startDate: {
        $gte: startDate,
        $lt: endDate,
      },
    })
    res.status(StatusCodes.OK).json({ slots })
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error fetching slots in range' })
  }
}

module.exports = {
  createSlot,
  getSlots,
  updateSlot,
  deleteSlot,
  getDailySlots,
  getWeeklySlots,
  getMonthlySlots,
  getSlotsInRange,
}
