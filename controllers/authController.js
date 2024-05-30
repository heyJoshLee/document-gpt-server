import User from '../models/user';
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
