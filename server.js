// Require the necessary modules
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
// Define the port of the server compared to the environment variable, and create an instance of the express server
const PORT = process.env.PORT || 3001;
const app = express();
// Add middleware to parse incoming JSON data and parse incoming form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Add the routes
app.use(routes);
// Start the server after the database connection is established and console log the port number
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});