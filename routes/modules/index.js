const express = require('express')
const router = express.Router()
const recordsModel = require('../../models/records')
const categoriesModel = require('../../models/categories')

// 首頁
router.get('/', async (req, res) => {
  const userId = req.user._id
  const records = await recordsModel.find({ userId }).lean()
  const categories = await categoriesModel.find().lean()
  records.forEach(record => {
    record.date = record.date.toJSON().toString().slice(0, 10)
    record.icon = categories.find(category => {
      // 這邊不能使用 === 來確認，需使用 equals() - Compares the equality of this ObjectId with otherID.
      return category._id.equals(record.categoryId)
    }).icon
  })
  res.render('index', {
    records,
    categories
  })
})

module.exports = router
