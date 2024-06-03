import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    length: {
      min: 1,
      max: 100
    },
    unique: true,
    trim: true
  },
  password: {
    type: String,
    length: {
      min: 1,
      max: 100
    },
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  verifiedEmail: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  editedAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  organizationId: {
    type: String,
    required: false
  },
  planId: {
    type: String,
    required: false
  }
});

// Automatically update the `editedAt` field on save
userSchema.pre('save', function (next) {
  this.editedAt = Date.now();
  next();
});

userSchema.methods.isActive = function () {
  return this.active === 'active';
}

userSchema.methods.isAdmin = function () {
  return this.role === 'admin';
}

const User = mongoose.model('User', userSchema);

export default User;
