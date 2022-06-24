const express = require('express')
const router = express.Router()
const UsersModel = require('../../models/users')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res, next) => {
  try {
    // 取得註冊表單參數
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (!email || !password) {
      errors.push({ message: 'Email 及 密碼 是必填項目。' })
    }
    if (password !== confirmPassword) {
      errors.push({ message: '密碼與確認密碼不相符！' })
    }
    if (errors.length) {
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    // 檢查使用者是否已經註冊
    UsersModel.findOne({ email })
      .then(user => {
        // 如果已經註冊：退回原本畫面
        if (user) {
          errors.push({ message: '這個 Email 已經註冊過了。' })
          res.render('register', {
            errors,
            name,
            email,
            password,
            confirmPassword
          })
        } else {
          // 如果還沒註冊：寫入資料庫
          return bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(password, salt))
            .then(hash => {
              UsersModel.create({
                name,
                email,
                password: hash
              })
            })
            .then(() => res.redirect('/'))
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  } catch (err) {
    next(err)
  }
})

router.get('/logout', (req, res, next) => {
  try {
    req.logout(err => {
      if (err) {
        return next(err)
      }
      req.flash('success_msg', '你已經成功登出。')
      res.redirect('/users/login')
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
