const usersModel = require('../users')
const categoriesModel = require('../categories')
const recordsModel = require('../records')
const bcrypt = require('bcryptjs')
const mongoose = require('../../config/mongoose')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongoose error!')
})
db.once('open', async () => {
  try {
    // 先將 dataBase 清空再創造新的資料
    await usersModel.deleteMany()
    await categoriesModel.deleteMany()
    await recordsModel.deleteMany()
    console.log('delete all data in database')
    // const { name, email, password } = SEED_USER2
    await categoriesModel.create(SEED_CATEGORY)
    await createUsersAndRecords()
    console.log('create New dummyData Successfully')
    console.log('database closed')
    process.exit()
  } catch (error) {
    console.log(error)
  }
})

// 建立新的使用者及記錄
async function createUsersAndRecords () {
  // 將 SEED_USERS 內的所有使用者做一個迴圈 ， 在資料庫建立使用者
  for (const SEED_USER of SEED_USERS) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(SEED_USER.password, salt)
    SEED_USER.password = hash
    const user = await usersModel.create(SEED_USER)
    const userId = user._id
    // 將使用者本身的記帳記錄建立到資料庫內
    for (const record of SEED_USER.records) {
      const category = await categoriesModel.findOne({ name: record.category })
      const categoryId = category._id
      await recordsModel.create(
        // 每一筆計帳記錄都綁定使用者Id 及 類型Id
        Object.assign({}, record, { userId }, { categoryId })
      )
    }
  }
}

// 以下為假資料

const SEED_USERS = [
  {
    name: '廣志',
    email: 'user1@example.com',
    password: '12345678',
    records: [
      {
        name: '午餐',
        date: '2019-04-23',
        amount: 60,
        category: '餐飲食品'
      },
      {
        name: '晚餐',
        date: '2019-04-23',
        amount: 60,
        category: '餐飲食品'
      },
      {
        name: '捷運',
        date: '2019-04-23',
        amount: 120,
        category: '交通出行'
      },
      {
        name: '租金',
        date: '2015-04-01',
        amount: 25000,
        category: '家居物業'
      }
    ]
  },
  {
    name: '小新',
    email: 'user2@example.com',
    password: '12345678',
    records: [
      {
        name: '電影：驚奇隊長',
        date: '2019-04-19',
        amount: 220,
        category: '休閒娛樂'
      }
    ]
  }
]

const SEED_CATEGORY = [
  { name: '家居物業', icon: 'fa-solid fa-house' },
  { name: '交通出行', icon: 'fa-solid fa-van-shuttle' },
  { name: '休閒娛樂', icon: 'fa-solid fa-face-grin-beam' },
  { name: '餐飲食品', icon: 'fa-solid fa-utensils' },
  { name: '其他', icon: 'fa-solid fa-pen' }
]
