const express = require('express');
const router = express.Router();

// Import route modules
const userRoutes = require('./user');
const thoughtRoutes = require('./thought');

// Use route modules
router.use(userRoutes);
router.use(thoughtRoutes);

module.exports = router;
