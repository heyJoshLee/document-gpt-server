import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
  templateSetId: {
    type: String,
    required: true
  },
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
    required: false
  },
  documentTitle: {
    type: String,
    length: {
      min: 1,
      max: 100
    },
    required: true
  },
  prompt: {
    type: String,
    required: true
  }
});

const Template = mongoose.model('Template', templateSchema);

export default Template;