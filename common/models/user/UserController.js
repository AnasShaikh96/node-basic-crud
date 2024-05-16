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

      res.status(200).json({
        status: true,
        data: allUsers
      })

    } catch (error) {
      res.status(500).json({
        status: false,
        error
      })
    }
  },
  patchUser: async (req, res) => {
    try {

      const { userId } = req.user;
      const payload = req.body


      // IF the payload does not have any keys,
      // THEN we can return an error, as nothing can be updated
      if (!Object.keys(payload).length) {
        return res.status(400).json({
          status: false,
          error: {
            message: "Body is empty, hence can not update the user.",
          },
        });
      }

      const user = await UserModel.updateUser({ id: userId }, payload)
      const getUser = await UserModel.getOneUser(user.id)

      res.status(200).json({
        status: true,
        data: getUser
      })

    } catch (error) {
      res.status(500).json({
        status: false,
        error
      })
    }
  }
}