import mongoose from 'mongoose';

const { Schema } = mongoose;

const mongoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  templateId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  editedAt: {
    type: Date,
    default: Date.now
  },
});

// Automatically update the `editedAt` field on save
mongoSchema.pre('save', function (next) {
  this.editedAt = Date.now();
  next();
});

const Document = mongoose.model('Document', mongoSchema);

export default Document;
