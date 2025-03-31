const express = require('express');
const router = express.Router();
const { Cohort, User, Course } = require('../models');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Get cohorts for a course
router.get('/course/:courseId', async (req, res) => {
  try {
    const cohorts = await Cohort.findAll({
      where: { courseId: req.params.courseId },
      include: [
        { model: User, as: 'students', attributes: ['id', 'username', 'email'] }
      ]
    });
    res.json(cohorts);
  } catch (error) {
    console.error('Error fetching cohorts:', error);
    res.status(500).json({ message: 'Error fetching cohorts' });
  }
});

// Create new cohort
router.post('/', authenticateToken, authorizeRoles(['admin', 'instructor']), async (req, res) => {
  try {
    const { name, courseId, startDate, endDate } = req.body;

    // Check if course exists
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const cohort = await Cohort.create({
      name,
      courseId,
      startDate,
      endDate
    });

    res.status(201).json(cohort);
  } catch (error) {
    console.error('Error creating cohort:', error);
    res.status(500).json({ message: 'Error creating cohort' });
  }
});

// Get cohort by ID
router.get('/:id', async (req, res) => {
  try {
    const cohort = await Cohort.findByPk(req.params.id, {
      include: [
        { model: User, as: 'students', attributes: ['id', 'username', 'email'] },
        { model: Course, attributes: ['id', 'title'] }
      ]
    });

    if (!cohort) {
      return res.status(404).json({ message: 'Cohort not found' });
    }

    res.json(cohort);
  } catch (error) {
    console.error('Error fetching cohort:', error);
    res.status(500).json({ message: 'Error fetching cohort' });
  }
});

// Update cohort
router.put('/:id', authenticateToken, authorizeRoles(['admin', 'instructor']), async (req, res) => {
  try {
    const cohort = await Cohort.findByPk(req.params.id);
    
    if (!cohort) {
      return res.status(404).json({ message: 'Cohort not found' });
    }

    const { name, startDate, endDate } = req.body;
    await cohort.update({ name, startDate, endDate });

    res.json(cohort);
  } catch (error) {
    console.error('Error updating cohort:', error);
    res.status(500).json({ message: 'Error updating cohort' });
  }
});

// Delete cohort
router.delete('/:id', authenticateToken, authorizeRoles(['admin', 'instructor']), async (req, res) => {
  try {
    const cohort = await Cohort.findByPk(req.params.id);
    
    if (!cohort) {
      return res.status(404).json({ message: 'Cohort not found' });
    }

    await cohort.destroy();
    res.json({ message: 'Cohort deleted successfully' });
  } catch (error) {
    console.error('Error deleting cohort:', error);
    res.status(500).json({ message: 'Error deleting cohort' });
  }
});

// Enroll students in cohort
router.post('/:id/enroll', authenticateToken, authorizeRoles(['admin', 'instructor']), async (req, res) => {
  try {
    const cohort = await Cohort.findByPk(req.params.id);
    
    if (!cohort) {
      return res.status(404).json({ message: 'Cohort not found' });
    }

    const { studentIds } = req.body;
    await cohort.addStudents(studentIds);

    res.json({ message: 'Students enrolled successfully' });
  } catch (error) {
    console.error('Error enrolling students:', error);
    res.status(500).json({ message: 'Error enrolling students' });
  }
});

// Get cohort leaderboard
router.get('/:id/leaderboard', async (req, res) => {
  try {
    const cohort = await Cohort.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'students',
          attributes: ['id', 'username', 'email', 'points'],
          order: [['points', 'DESC']]
        }
      ]
    });

    if (!cohort) {
      return res.status(404).json({ message: 'Cohort not found' });
    }

    res.json(cohort.students);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Error fetching leaderboard' });
  }
});

module.exports = router; 