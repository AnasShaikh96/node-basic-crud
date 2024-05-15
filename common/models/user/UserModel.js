const { DataTypes, where } = require('sequelize')

const UserModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user'
  }
}

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define('new-user', UserModel)
  },
  createUser: (user) => {
    return this.model.create(user)
  },
  findUser: (query) => {
    return this.model.findOne({ where: query })
  },
  findAllUsers: (query) => {
    return this.model.findAll()
  },
  updateUser: (query, updatedValue) => {
    return this.model.update(updatedValue, { where: query })
  }
}