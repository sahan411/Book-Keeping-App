const asynchHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware for protected routes
const authMiddleware = asynchHandler(async (req, res, next) => {
  let token;

  // Check if the request has authorization header with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID from the decoded token
      const user = await User.findById(decoded.id);

      // If user is not found, respond with error
      if (!user) {
        res.status(404);
        throw new Error('User not found');
      }

      // Add user data to the request object (req.user)
      req.user = user;

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token is invalid or expired');
    }
  }

  // If no token is provided in the authorization header
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = authMiddleware;
