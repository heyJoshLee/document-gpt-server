import mongoose from 'mongoose';

const { Schema } = mongoose;

const mongoSchema = new Schema({
  name: {
    type: String,
    length: {
      min: 1,
      max: 100
    },
    required: true
  },
  description: {
    type: String,
    length: {
      min: 1,
      max: 1000
    },
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  editedAt: {
    type: Date,
    default: Date.now
  },
  questionSetId: {
    type: String,
  },
});

// Automatically update the `editedAt` field on save
mongoSchema.pre('save', function (next) {
  this.editedAt = Date.now();
  next();
});

const TemplateSet = mongoose.model('TemplateSet', mongoSchema);

export default TemplateSet;
