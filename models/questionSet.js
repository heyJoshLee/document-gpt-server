import mongoose from 'mongoose';

const questionSetSchema = new mongoose.Schema({
  name: {
    type: String,
    length: {
      min: 1,
      max: 100
    },
    required: true
  },
  templateSetId: {
    type: String,
  },
  description: {
    type: String,
    length: {
      min: 1,
      max: 1000
    },
    required: false
  },

});

const QuestionSet = mongoose.model('QuestionSet', questionSetSchema);

export default QuestionSet;