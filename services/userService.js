import User from "../models/user.js";
import bcrypt from 'bcryptjs';

const UserService = () => {

  const createUser = async (userParams) => {
    const email = userParams?.email.toLowerCase();
    let newUserParams = {
      ...userParams,
      email
    }
    // Check to see if user already exsists
    const exsistingUser = await User.findOne({ email: newUserParams.email });
    if (exsistingUser) {
      return {
        message: "User already exsits."
      };
    }

    // HASH PASSWORD
    const newUser = new User(newUserParams);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(userParams.password, salt);
    return await newUser.save();

  }

  return {
    createUser
  }

}

export default UserService;