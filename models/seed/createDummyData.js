const usersModel = require('../users')
const mongoose = require('../../config/mongoose')
const db = mongoose.connection

const SEED_USER1 = {
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
}
const SEED_USER2 = {
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

db.on('error', () => {
  console.log('mongoose error!')
})
db.once('open', async () => {
  try {
    // 先將 dataBase 清空再創造新的資料
    await usersModel.deleteMany()
    console.log('delete all data in database')
    // const { name, email, password } = SEED_USER2
    await usersModel.create([SEED_USER1, SEED_USER2])
    console.log('create New dummyData Successfully')
    console.log('database closed')
    process.exit()
  } catch (error) {
    console.log(error)
  }
})
