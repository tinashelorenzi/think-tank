const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth');
const courseRoutes = require('./courses');
const cohortRoutes = require('./cohorts');
const assignmentRoutes = require('./assignments');
const quizRoutes = require('./quizzes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);
router.use('/cohorts', cohortRoutes);
router.use('/assignments', assignmentRoutes);
router.use('/quizzes', quizRoutes);

module.exports = router; 