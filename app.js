const express = require('express')
const exphbs = require('express-handlebars').engine
const methodOverride = require('method-override')
const session = require('express-session')
const router = require('./routes')
require('./config/mongoose')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const app = express()
const port = process.env.PORT || 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')

// 載入 public
app.use(express.static('public'))
// load bodyParser
app.use(express.urlencoded({ extended: true }))
// 載入 methodOverride
app.use(methodOverride('_method'))

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
  console.log(`expense-tracker listening on port ${port}`)
})
