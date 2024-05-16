const UserModel = require('../models/user/UserModel')

module.exports = {

  checkPermission: async (req, res, next) => {
    try {
      const { user } = req;
      // console.log('user', user)

      const getUser = await UserModel.findUser(user.userId)

      if (getUser.role === 'user') {
        res.status(400).json({
          status: false,
          error: {
            message: 'You do not have permission to access this URL.'
          }
        })
      }

      next()

    } catch (error) {

      res.status(500).json({
        status: false,
        error
      })

    }
  }
}