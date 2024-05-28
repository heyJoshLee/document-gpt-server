import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Import routes
import documentRoutes from './routes/documents.js';

// Initialize express with options
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

// Set up routes
app.use('/documents', documentRoutes);

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
  }))
  .catch((error) => console.log(error.message)); 