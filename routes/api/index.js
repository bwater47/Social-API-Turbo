// Import the express server and instantiate the router, then require the thought and user routes
const router = require("express").Router();
const thoughtRoutes = require("./thoughtRoutes");
const userRoutes = require("./userRoutes");
// Use the thoughts and users routers as middleware for the router with /thoughts and /users as the base routes
router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);
// Export the router
module.exports = router;
