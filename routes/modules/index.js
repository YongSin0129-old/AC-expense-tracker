const express = require('express')
const router = express.Router()
const recordsModel = require('../../models/records')
const categoriesModel = require('../../models/categories')

// 首頁
router.get('/', async (req, res, next) => {
  try {
    const userId = req.user._id
    const categories = await categoriesModel.find().lean()
    const filterMethod = req.query.name
    const categoryId = req.query.category
    let records = await recordsModel.find({ userId }).lean()
    if (filterMethod) {
      records = records.filter(record => record.categoryId.equals(categoryId))
    }

    records.forEach(record => {
      record.date = record.date
        .toJSON()
        .toString()
        .slice(0, 10)
      record.icon = categories.find(category => {
        // 這邊不能使用 === 來確認，需使用 equals() - Compares the equality of this ObjectId with otherID.
        return category._id.equals(record.categoryId)
      }).icon
    })

    const totalAmount = records.reduce((pre, cur) => pre + cur.amount, 0)
    res.render('index', {
      records,
      categories,
      totalAmount,
      filterMethod
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
