import mongoose from 'mongoose';

// Define the Plan schema
const planSchema = new mongoose.Schema({
  priceInCents: {
    type: Number,
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  editedAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Plan model
const Plan = mongoose.model('Plan', planSchema);

// Export the Plan model
export default Plan;