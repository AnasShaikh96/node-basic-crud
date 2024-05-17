const express = require('express');
const app = express()
const { Sequelize } = require('sequelize')
const morgan = require('morgan')
const cors = require("cors");

const UserRoutes = require('./common/models/user/UserRoutes');
const AuthorizationRoutes = require('./authorization/routes/AuthorizationRoutes')
const UserModel = require('./common/models/user/UserModel')

app.use(morgan('tiny'))
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './storage/data.db'
})

UserModel.initialise(sequelize);

sequelize.sync().then(() => {

  console.log('Sequelize Initiated')

  app.use("/", AuthorizationRoutes)
  app.use("/user", UserRoutes)

  app.listen(3000, () => {
    console.log('Server Live on port 3000')
  })
}).catch((err) => {
  console.log('Sequelize Threw an error')
})

