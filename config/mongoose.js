const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// create mongoose connection
mongoose
  .connect(process.env.MONGODB_URI_accounting, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('mongoose ok !')
  })
  .catch(error => {
    console.log('mongoose NG !')
    console.log(error)
  })

module.exports = mongoose
