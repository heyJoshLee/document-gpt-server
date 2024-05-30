import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {

  console.log('req.body', req.body)
  let userParams = req.body;

  userParams.email = userParams?.email.toLowerCase();
  // SEE IF USER ALREADY EXSISTS
  try {
    const exsistingUser = await User.findOne({ email: userParams.email });
    if (exsistingUser) {
      return res.status(500).json({
        message: "User already exsits."
      });
    }

    // HASH PASSWORD
    const newUser = new User(userParams);
    const salt = await bcrypt.genSalt(10);
    // @ts-ignore
    newUser.password = await bcrypt.hash(userParams.password, salt);
    await newUser.save();

    // SIGN IN USER WITH JWT
    const payload = {
      user: {
        id: newUser.id
      }
    }

    jwt.sign(payload, process.env.JWT_SECRET, (error, token) => {
      if (error) throw error;
      return res.status(200).json({
        token: token,
        user: newUser,
        loggedIn: true
      });
    })
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