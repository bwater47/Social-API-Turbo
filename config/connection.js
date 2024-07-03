const mongoose = require('mongoose');

// Connect to the Mongo DB
mongoose.connect('mongodb://localhost:27017/');

// Export the connection
module.exports = mongoose.connection;