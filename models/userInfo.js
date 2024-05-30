import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    length: {
      min: 1,
      max: 100
    },
    required: false
  },
  lastName: {
    type: String,
    length: {
      min: 1,
      max: 100
    },
    required: false
  },
  businessName: {
    type: String,
    length: {
      min: 1,
      max: 100
    },
    required: true
  },

});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

export default UserInfo;