import UserService from '../services/userService.js';
import AuthService from '../services/authService.js';
import User from '../models/user.js';
import Document from '../models/document.js';


export const createUserWithoutPassword = async (req, res) => {
  try {
    const UserServiceInstance = UserService();
    const newUser = await UserServiceInstance.createUserWithoutPassword(req.body);
    console.log('newUser', newUser)
    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({
      message: error.message
    })
  }
}

export const createUser = async (req, res) => {
  // console.log('req.body', req.body)
  // try {
  //   const UserServiceInstance = UserService();
  //   const newUser = await UserServiceInstance.createUser(req.body);
  //   const AuthServiceInstance = AuthService();
  //   const logInToken = AuthServiceInstance.createLogInToken(newUser._id);
  //   console.log('logInToken', logInToken)
  //   return res.status(200).json(logInToken);
  // } catch (error) {
  //   console.log(error.message);
  //   return res.status(404).json({
  //     message: error.message
  //   })
  // }
}
// Get all
export const getAllUsers = async (req, res) => {
  console.log('getting all users')
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
// Get single object
export const getUserById = async (req, res) => {
  console.log('body is', req.body)
  console.log('getting the user with user Id', req.params.id)
  try {
    const user = await User.findById(req.params.id);
    console.log('user', user)
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update one
export const updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


// Delete one
export const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getDocumentsForUserWithId = async (req, res) => {
  const userId = req.params.id;
  console.log('userId', userId)
  console.log('getting documents for user with id', userId)

  try {
    const documents = await Document.find({ userId: userId });
    if (!documents) {
      return res.status(404).json({ error: 'Documents not found' });
    }
    console.log('documents', documents)
    return res.status(200).json(documents);

  } catch (error) {
    console.log('error', error)
    return res.status(500).json({ error: 'Server error' });
  }
}
