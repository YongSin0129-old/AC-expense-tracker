const express = require('express')
const router = express.Router()
const recordsModel = require('../../models/records')
const categoriesModel = require('../../models/categories')

router.get('/new', async (req, res) => {
  const categories = await categoriesModel.find().lean()
  res.render('new', { categories })
})

router.get('/:id/edit', async (req, res, next) => {
  const userId = req.user._id
  const recordId = req.params.id
  const selectedRecord = await recordsModel
    .findOne({ _id: recordId, userId })
    .lean()
  selectedRecord.date = selectedRecord.date
    .toJSON()
    .toString()
    .slice(0, 10)
  const categories = await categoriesModel.find().lean()
  const categoryName = categories.find(category => {
    return category._id.equals(selectedRecord.categoryId)
  }).name

  res.render('edit', { selectedRecord, categories, categoryName })
})

module.exports = router
