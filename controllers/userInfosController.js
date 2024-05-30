import UserInfo from '../models/UserInfo.js';
// Get all user info
const getAllUserInfos = async (req, res) => {
  try {
    const userInfos = await UserInfo.find();
    res.json(userInfos);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single user info by ID
const getUserInfoById = async (req, res) => {
  const { id } = req.params;
  try {
    const userInfo = await UserInfo.findById(id);
    if (!userInfo) {
      return res.status(404).json({ error: 'User info not found' });
    }
    res.json(userInfo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new user info
const createUserInfo = async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const userInfo = await UserInfo.create({ name, email, age });
    res.status(201).json(userInfo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an existing user info
const updateUserInfo = async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const userInfo = await UserInfo.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true }
    );
    if (!userInfo) {
      return res.status(404).json({ error: 'User info not found' });
    }
    res.json(userInfo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a user info
const deleteUserInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const userInfo = await UserInfo.findByIdAndDelete(id);
    if (!userInfo) {
      return res.status(404).json({ error: 'User info not found' });
    }
    res.json({ message: 'User info deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllUserInfos,
  getUserInfoById,
  createUserInfo,
  updateUserInfo,
  deleteUserInfo,
};