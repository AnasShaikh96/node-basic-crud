const jwt = require('jsonwebtoken');
const { jwtsecret } = require('../../config');

module.exports = {
  check: async (req, res, next) => {

    try {

      const authHeaders = req.headers.authorization;

      if (!authHeaders) {
        res.status(400).json({
          status: false,
          error: {
            message: 'Authorization headers was not provided.'
          }
        })
      }

      const token = authHeaders.split(" ")[1];

      if (!token) {
        res.status(400).json({
          status: false,
          error: {
            message: 'Provided token is invalid.'
          }
        })
      }


      jwt.verify(token, jwtsecret, (err, user) => {

        if (err) {
          res.status(400).json({
            status: false,
            error: {
              message: 'Invalid token.'
            }
          })
        }
        req.user = user;
      })

      next()
    } catch (error) {

      res.status(500).json({
        status: false,
        error
      })

    }
  }
}