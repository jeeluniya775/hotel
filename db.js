const mongoose = require('mongoose');

// Define the MongoDB connection URL with the database name
//const mongoURL = 'mongodb://localhost:27017/hotel';
 // Replace 'yourDatabaseName' with the actual name of your database

const mongoURL= 'mongodb+srv://jeelpatel1817:JEELPATEL1817@hotel.oyriuzv.mongodb.net/'


//const mongoURL=process.env.MONGODB_URL 

// Connect to MongoDB
mongoose.connect(mongoURL, {

});

// Get the default connection
const db = mongoose.connection;

// Define event listeners for the database connection
db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});


//just a comment
// Export the database connection
module.exports = db;