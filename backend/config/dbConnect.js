const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    console.log("Connecting to MongoDB...");
    
    // Log the URI to debug (remove this later)
    console.log("MongoDB URI:", process.env.MONGO_URI ? "URI exists" : "URI is undefined");
    
    // If URI is undefined, try a fallback (for testing only)
    const uri = process.env.MONGO_URI || "mongodb+srv://sahankav411:Skavin@123@cluster0.qkdi7.mongodb.net/";
    
    const conn = await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Stop server on DB failure
  }
};

module.exports = dbConnect;