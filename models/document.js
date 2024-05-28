import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateUpdated: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['review', 'published'],
    default: 'review'
  },
  templateId: {
    type: String,
    ref: 'Template',
    required: true
  },
  userId: {
    type: String,
    ref: 'User',
    required: true
  }
});

const Document = mongoose.model('Document', documentSchema);

export default Document;