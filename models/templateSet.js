import mongoose from 'mongoose';

const { Schema } = mongoose;

const templateSet = new Schema({
  name: {
    type: String,
    length: {
      min: 1,
      max: 100
    },
    required: true,
    trim: true
  },
  planId: {
    type: String,
    required: true
  }
});

const TemplateSet = mongoose.model('TemplateSet', templateSet);

export default TemplateSet;
