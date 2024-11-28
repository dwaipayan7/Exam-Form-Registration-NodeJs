const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const formRouter = require('./routes/formRouter');
const examCentreRouter = require('./routes/examCentreRouter');
const courseRouter = require('./routes/courseRouter');
const cors = require('cors');
const { config } = require('dotenv');
config();

const app = express();

connectDB();

// Set up CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE', 
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', formRouter);
app.use('/api', examCentreRouter);
app.use('/api', courseRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running on server: ${PORT}`);
});
