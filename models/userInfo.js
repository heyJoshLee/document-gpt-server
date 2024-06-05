import mongoose from "mongoose";

const UserInfo = mongoose.model('UserInfo', {}, 'userInfo');

export default UserInfo;