const UserModel = require("./UserModel");

module.exports = {
  getOneUser: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await UserModel.findUser({ id });
      console.log(user)

      res.status(200).json(user);

    } catch (error) {

      res.status(404).json({
        status: false,
        error: {
          message: 'Not Found'
        }
      })
    }
  },
  getAllUsers: async (req, res) => {

    try {

      const allUsers = await UserModel.findAllUsers();

      res.status(200).json(allUsers)

    } catch (error) {

      console.log('error', error)

      res.status(404).json({
        status: false,
        error: {
          message: 'Some error occured'
        }
      })


    }




  }
}