const express = require('express')
const exphbs = require('express-handlebars').engine
const router = require('./routes')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
