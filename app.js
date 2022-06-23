const express = require('express')
const exphbs = require('express-handlebars').engine
const session = require('express-session')
const router = require('./routes')
require('./config/mongoose')
const usePassport = require('./config/passport')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')

// load bodyParser
app.use(express.urlencoded({ extended: true }))

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

// 本地變數
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

// 設定總路由
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
