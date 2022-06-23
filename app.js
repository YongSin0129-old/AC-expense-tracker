const express = require('express')
const exphbs = require('express-handlebars').engine
const session = require('express-session')
const router = require('./routes')
require('./config/mongoose')
const usePassport = require('./config/passport')
const flash = require('connect-flash')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')

// load bodyParser
app.use(express.urlencoded({ extended: true }))
// 載入 public
app.use(express.static('public'))

// cookie-session
app.use(
  session({
    secret: process.env.session_secret,
    resave: false,
    saveUninitialized: true
  })
)

// 呼叫 Passport 函式
usePassport(app)

// 呼叫 flash ，給使用者提示
app.use(flash())

// 本地變數
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error_msg = req.flash('error')
  next()
})

// 設定總路由
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
