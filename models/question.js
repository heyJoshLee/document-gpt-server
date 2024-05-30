import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionSetId: {
    type: String,
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  body: {
    type: String,
    length: {
      min: 1,
      max: 1000
    },
    required: true
  },
  helperText: {
    type: String,
    required: false
  },
  internalName: {
    type: String,
    length: {
      min: 1,
      max: 100
    },
    required: true
  },
  inputType: {
    type: String,
    length: {
      min: 1,
      max: 100
    },
    required: true
  }
});

const Question = mongoose.model('Question', questionSchema);

export default Question;