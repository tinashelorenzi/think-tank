const express = require('express');
const router = express.Router();
const { Assignment, Course, User, Submission } = require('../models');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Get assignments for a course
router.get('/course/:courseId', async (req, res) => {
  try {
    const assignments = await Assignment.findAll({
      where: { courseId: req.params.courseId },
      include: [
        { model: User, as: 'instructor', attributes: ['id', 'username', 'email'] }
      ]
    });
    res.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ message: 'Error fetching assignments' });
  }
});

// Create new assignment
router.post('/', authenticateToken, authorizeRoles(['admin', 'instructor']), async (req, res) => {
  try {
    const { title, description, courseId, dueDate, maxPoints } = req.body;

    // Check if course exists
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const assignment = await Assignment.create({
      title,
      description,
      courseId,
      dueDate,
      maxPoints,
      instructorId: req.user.id
    });

    res.status(201).json(assignment);
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(500).json({ message: 'Error creating assignment' });
  }
});

// Get assignment by ID
router.get('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id, {
      include: [
        { model: User, as: 'instructor', attributes: ['id', 'username', 'email'] },
        { model: Course, attributes: ['id', 'title'] }
      ]
    });

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.json(assignment);
  } catch (error) {
    console.error('Error fetching assignment:', error);
    res.status(500).json({ message: 'Error fetching assignment' });
  }
});

// Update assignment
router.put('/:id', authenticateToken, authorizeRoles(['admin', 'instructor']), async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Check if user is authorized to update this assignment
    if (req.user.role !== 'admin' && assignment.instructorId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this assignment' });
    }

    const { title, description, dueDate, maxPoints } = req.body;
    await assignment.update({ title, description, dueDate, maxPoints });

    res.json(assignment);
  } catch (error) {
    console.error('Error updating assignment:', error);
    res.status(500).json({ message: 'Error updating assignment' });
  }
});

// Delete assignment
router.delete('/:id', authenticateToken, authorizeRoles(['admin', 'instructor']), async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Check if user is authorized to delete this assignment
    if (req.user.role !== 'admin' && assignment.instructorId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this assignment' });
    }

    await assignment.destroy();
    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    console.error('Error deleting assignment:', error);
    res.status(500).json({ message: 'Error deleting assignment' });
  }
});

// Submit assignment
router.post('/:id/submit', authenticateToken, async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Check if submission is past due date
    if (new Date() > new Date(assignment.dueDate)) {
      return res.status(400).json({ message: 'Assignment submission is past due date' });
    }

    const { content, fileUrl } = req.body;
    const submission = await Submission.create({
      assignmentId: assignment.id,
      studentId: req.user.id,
      content,
      fileUrl,
      submittedAt: new Date()
    });

    res.status(201).json(submission);
  } catch (error) {
    console.error('Error submitting assignment:', error);
    res.status(500).json({ message: 'Error submitting assignment' });
  }
});

// Grade submission
router.put('/submissions/:submissionId/grade', authenticateToken, authorizeRoles(['admin', 'instructor']), async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.submissionId);
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    const assignment = await submission.getAssignment();
    
    // Check if user is authorized to grade this submission
    if (req.user.role !== 'admin' && assignment.instructorId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to grade this submission' });
    }

    const { points, feedback } = req.body;
    
    // Validate points
    if (points > assignment.maxPoints) {
      return res.status(400).json({ message: 'Points cannot exceed maximum points' });
    }

    await submission.update({
      points,
      feedback,
      gradedAt: new Date(),
      gradedBy: req.user.id
    });

    // Update student's total points
    const student = await submission.getStudent();
    await student.increment('points', { by: points });

    res.json(submission);
  } catch (error) {
    console.error('Error grading submission:', error);
    res.status(500).json({ message: 'Error grading submission' });
  }
});

module.exports = router; 