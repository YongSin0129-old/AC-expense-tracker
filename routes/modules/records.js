const express = require('express')
const router = express.Router()
const recordsModel = require('../../models/records')
const categoriesModel = require('../../models/categories')

// 新增 record
router.get('/new', async (req, res) => {
  const categories = await categoriesModel.find().lean()
  res.render('new', { categories })
})

router.post('', async (req, res) => {
  const userId = req.user._id
  req.body.userId = userId
  await recordsModel.create(req.body)
  req.flash('success_msg', '成功新增記錄')
  res.redirect('/')
})

// 修改 record
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

router.put('/:id', async (req, res) => {
  const userId = req.user._id
  const recordId = req.params.id
  const record = await recordsModel.findOne({ _id: recordId, userId })
  const revisedRecord = Object.assign(record, req.body)
  await revisedRecord.save()
  req.flash('success_msg', '成功修改記錄')
  res.redirect('/')
})

// 刪除 record
router.delete('/:id', async (req, res) => {
  const userId = req.user._id
  const recordId = req.params.id
  await recordsModel.deleteOne({ _id: recordId, userId })
  req.flash('success_msg', '成功刪除記錄')
  res.redirect('/')
})

module.exports = router
