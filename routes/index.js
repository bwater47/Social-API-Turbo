// Require the express connection and the routes from the api folder
const router = require("express").Router();
const apiRoutes = require("./api");
// Use the api routes as middleware for the router with /api as the base route
router.use("/api", apiRoutes);
// If the route is not found, send a 404 error
router.use((req, res) => res.send("Wrong Route!"));
// Export the the router
module.exports = router;
