const Ajv = require('ajv');
const ajv = new Ajv()


module.exports = {

  validate: (schema) => {

    if (!schema) {
      new Error('Schema not provided')
    }


    return (req, res, next) => {

      try {

        const body = req.body

        const verify = ajv.compile(schema);
        const validateData = verify(body);


        if (!validateData) {

          res.status(400).json({
            status: false,
            error: {
              message: 'Schema not valid'
            }
          })
        }

        next();

      } catch (error) {

        res.status(500).json({
          status: false,
          error
        })

      }

    }


  }

}