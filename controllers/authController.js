import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const logIn = async (req, res) => {
  try {
    const logInParams = req.body;
    // FORCE EMAIL TO LOWERCASE
    const emailParams = logInParams.email.toLowerCase();
    const user = await User.findOne({ email: emailParams });

    // CANT FIND USER
    if (!user) {
      console.log("USER NOT FOUND");
      return res.status(501).json({
        message: "Invalid credentials."
      });
    }

    const passwordMatches = await bcrypt.compare(logInParams.password, user.password);

    // WRONG PASSWORD
    if (!passwordMatches) {
      console.log("WRONG PASSWORD")
      return res.status(400).json({
        message: "Invalid credentials."
      })
    }

    // Sign in user with jwt
    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, process.env.JWT_SECRET, (error, token) => {
      if (error) throw error;
      console.log('user', user)
      console.log('token', token)
      console.log('Successfully logged in');

      return res.status(200).json({
        auth: {
          token,
          loggedIn: true,
          userId: user.id
        },
        user: user,
      });
    })

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      message: error.message
    })
  }
}

export const changeEmail = async (req, res) => {
  let { originalEmail, newEmail } = req.body;
  originalEmail = originalEmail.toLowerCase();
  newEmail = newEmail.toLowerCase();

  try {
    // Find the user by email
    console.log('originalEmail', originalEmail)
    console.log('looking for user');
    const user = await User.findOne({ email: originalEmail });

    console.log('user', user)
    // User not found
    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    // Change the user's email
    user.email = newEmail;
    await user.save();
    console.log('users new info', user)


    return res.status(200).json({
      message: "Email changed successfully.",
      user,
      success: true
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: error.message,
      success: false
    });
  }
}
export const changePassword = async (req, res) => {
  console.log('req.body', req.body)
  let { userId, password } = req.body;
  console.log(userId, password)
  try {
    // Find the user by id
    const user = await User.findOne({ _id: userId });
    console.log('user', user)
    // User not found
    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Change the user's password
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({
      message: "Password changed successfully.",
      user
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: error.message
    });
  }
}