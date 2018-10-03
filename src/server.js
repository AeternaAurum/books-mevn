const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const epilogue = require('epilogue')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const db = new Sequelize({
  dialect: 'sqlite',
  storage: './test.sqlite'
})

const Book = db.define('books', {
  title: Sequelize.STRING,
  author: Sequelize.STRING,
  pageCount: Sequelize.INTEGER,
  description: Sequelize.STRING,
  type: Sequelize.STRING
})

epilogue.initialize({
  app: app,
  sequelize: db
})

const userResource = epilogue.resource({
  model: Book,
  endpoints: ['/books', '/books/:id']
})


db.sync({
  force: false
}).then(() => {
  app.listen(8081, () => {
    console.log('Listening on port 8081')
  })
})