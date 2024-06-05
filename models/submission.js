import mongoose from 'mongoose';

const { Schema } = mongoose;

const Submission = mongoose.model('Submission', {}, 'submissions');

export default Submission;
