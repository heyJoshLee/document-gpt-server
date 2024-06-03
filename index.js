import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Import routes
import documentRoutes from "./routes/documents.js";
import userRoutes from './routes/users.js';
import questionSetRoutes from './routes/questionSets.js';
import questionRoutes from './routes/questions.js';
import templateRoutes from './routes/templates.js';
import templateSetRoutes from './routes/templateSets.js';
import planRoutes from './routes/plans.js';
import adminRoutes from './routes/admin.js';

// Initialize express with options
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

// Set up routes
app.use('/documents', documentRoutes);
app.use('/users', userRoutes);
app.use('/questionSets', questionSetRoutes);
app.use('/questions', questionRoutes);
app.use('/templatesets', templateSetRoutes);
app.use('/templates', templateRoutes);
app.use('/plans', planRoutes);
app.use('/admin', adminRoutes);

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
  }))
  .catch((error) => console.log(error.message));

export default app;