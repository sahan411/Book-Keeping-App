// server.js
require('dotenv').config(); // This should be the first line
const path = require('path');
const express = require('express');
const routes = require('./routes/userRoutes');
const error = require('./middlewares/errorMiddleware');
const bookRouter = require('./routes/bookRoutes');
const dbConnect = require('./config/dbConnect');

// Connect to database
dbConnect();

const app = express();

// Routes
app.use(express.json());
app.use('/api/users', routes.userRouter);
app.use('/api/books', bookRouter.bookRouter);

// Static files
const __dirname2 = path.resolve();
app.use('/uploads', express.static(path.join(__dirname2, '/uploads')));

// Deployment configuration
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname2, '/frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname2, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// Error handling
app.use(error.notfoundErrorMiddleware);
app.use(error.errorMiddlewareHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});