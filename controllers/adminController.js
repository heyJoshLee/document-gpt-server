import UserService from '../services/userService.js';

export const adminCreateUser = async (req, res) => {
  console.log('Creating user in adminCreateUser', req.body)
  try {
    const UserServiceInstance = UserService();
    const newUser = await UserServiceInstance.createUser(req.body);
    console.log('newUser', newUser)
    return res.status(201).json(newUser);
  } catch (error) {
    console.log('Error creating user in adminCreateUser', error.message)
    return res.status(500).json({ error: 'Failed to create user' });
  }
}