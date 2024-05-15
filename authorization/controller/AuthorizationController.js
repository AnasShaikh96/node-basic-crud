const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { jwtsecret, expirationTimeInSeconds } = require('../../config')
const UserModel = require('../../common/models/user/UserModel')


const generateAccessToken = (userName, userId) => {
  return jwt.sign({
    userId, userName
  }, jwtsecret, {
    expiresIn: expirationTimeInSeconds
  })
}

const encryptPassword = (password) => {
  const hash = crypto.createHash('sha256')
  hash.update(password)
  return hash.digest('hex')
}

module.exports = {
  register: async (req, res) => {

    try {
      const { name, email, password, role } = req.body;

      let encryptedPassword = encryptPassword(password);

      let getRole = role;
      if (!getRole) {
        getRole = 'user'
      }

      const user = await UserModel.createUser({ name, email, ...{ password: encryptedPassword }, getRole });

      let accessToken = generateAccessToken(name, user.id)

      res.status(200).json({
        status: 'Ok',
        data: user,
        token: accessToken
      })


    } catch (error) {

      res.status(404).json({
        status: false,
        error: {
          message: 'Cannot Register User' + error,
        }
      })

    }



  },
  login: async (req, res) => {

    try {

      const { email, password } = req.body;

      let encryptedPassword = encryptPassword(password);

      const user = await UserModel.findUser({ email })

      if (!user) {
        res.status(404).json({
          status: false,
          error: {
            message: `User with email: ${email} does not exists!`
          }
        })
      }

      if (user.password !== encryptedPassword) {
        res.status(400).json({
          status: false,
          error: {
            message: `Provided Email and password does not match!`
          }
        })
      }

      const accessToken = generateAccessToken(email, user.id)

      res.status(200).json({
        status: true,
        data: user,
        token: accessToken
      });

    } catch (error) {

      res.status(500).json({
        status: false,
        error
      })

    }



  }
}