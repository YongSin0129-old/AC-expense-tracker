const express = require('express')
const router = express.Router()
const recordsModel = require('../../models/records')
const categoriesModel = require('../../models/categories')

router.get('/new', async (req, res) => {
  const categories = await categoriesModel.find().lean()
  res.render('new', { categories })
})

module.exports = router
