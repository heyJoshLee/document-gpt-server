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
  status: {
    type: String,
    default: 'draft',
    enum: ['draft', 'published'],
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

mongoSchema.methods.publish = function () {
  this.status = 'published';
  return this.save();
};

mongoSchema.methods.unpublish = function () {
  this.status = 'draft';
  return this.save();
};

mongoSchema.methods.needsReview = function () {
  return this.status === 'draft';
}

const Document = mongoose.model('Document', mongoSchema);

export default Document;
