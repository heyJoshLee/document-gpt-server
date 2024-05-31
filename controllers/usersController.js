import UserService from '../services/userService.js';
import AuthService from '../services/authService.js';
export const createUser = async (req, res) => {
  console.log('req.body', req.body)
  try {
    const UserServiceInstance = UserService();
    const newUser = await UserServiceInstance.createUser(req.body);
    const AuthServiceInstance = AuthService();
    const logInToken = AuthServiceInstance.createLogInToken(newUser._id);
    console.log('logInToken', logInToken)
    return res.status(200).json(logInToken);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({
      message: error.message
    })
  }
}


export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message
    });
  }
}

export const getUser = async (req, res) => {
  const id = req.params.id;
  console.log('getting use with id of', id)
  try {
    const user = await User.findById(id)
    res.status(200).json(user);
  } catch (error) {
    console.log(error)
  }
}
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const user_params = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, user_params, { new: true })
    res.status(200).json(user);
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = async (req, res) => {
  return res.status(400).json({
    message: "Not implemented"
  })

}