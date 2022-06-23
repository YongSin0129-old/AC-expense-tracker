const express = require('express')
const router = express.Router()
const recordsModel = require('../../models/records')

// 首頁
router.get('/', (req, res) => {
  const userId = req.user._id
  const sortMethod = req.query.sort || '_id'
  recordsModel.find({ userId })
    .sort(sortMethod)
    .lean()
    .then(records => {
      res.render('home', { records })
    })
    .catch(error => {
      console.log(error)
    })
})

module.exports = router
