const categoriesModel = require('../categories')
const mongoose = require('../../config/mongoose')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongoose error!')
})
db.once('open', async () => {
  try {
    // 先將 dataBase 清空再創造新的資料
    await categoriesModel.deleteMany()
    await categoriesModel.create(SEED_CATEGORY)
    console.log('create categories Successfully')
    console.log('process closed')
    process.exit()
  } catch (error) {
    console.log(error)
  }
})

const SEED_CATEGORY = [
  { name: '家居物業', icon: 'fa-solid fa-house' },
  { name: '交通出行', icon: 'fa-solid fa-van-shuttle' },
  { name: '休閒娛樂', icon: 'fa-solid fa-face-grin-beam' },
  { name: '餐飲食品', icon: 'fa-solid fa-utensils' },
  { name: '其他', icon: 'fa-solid fa-pen' }
]
