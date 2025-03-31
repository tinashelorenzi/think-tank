const express = require('express');
const router = express.Router();
const { Course, User, Content, Assignment, Quiz, Cohort } = require('../models');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [
        { model: User, as: 'instructor', attributes: ['id', 'username', 'email'] },
        { model: Content, attributes: ['id', 'title', 'type'] }
      ]
    });
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

// Create new course
router.post('/', authenticateToken, authorizeRoles(['admin', 'instructor']), async (req, res) => {
  try {
    const { title, description, instructorId } = req.body;
    
    const course = await Course.create({
      title,
      description,
      instructorId: instructorId || req.user.id
    });

    res.status(201).json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Error creating course' });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [
        { model: User, as: 'instructor', attributes: ['id', 'username', 'email'] },
        { model: Content, attributes: ['id', 'title', 'type', 'order'] }
      ]
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Error fetching course' });
  }
});

// Update course
router.put('/:id', authenticateToken, authorizeRoles(['admin', 'instructor']), async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is authorized to update this course
    if (req.user.role !== 'admin' && course.instructorId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this course' });
    }

    const { title, description } = req.body;
    await course.update({ title, description });

    res.json(course);
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Error updating course' });
  }
});

// Delete course
router.delete('/:id', authenticateToken, authorizeRoles(['admin', 'instructor']), async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is authorized to delete this course
    if (req.user.role !== 'admin' && course.instructorId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this course' });
    }

    await course.destroy();
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Error deleting course' });
  }
});

// Add content to course
router.post('/:id/content', authenticateToken, authorizeRoles(['admin', 'instructor']), async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (req.user.role !== 'admin' && course.instructorId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to add content to this course' });
    }

    const content = await Content.create({
      ...req.body,
      courseId: course.id
    });

    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error adding content', error: error.message });
  }
});

// Get course content
router.get('/:id/content', authenticateToken, async (req, res) => {
  try {
    const content = await Content.findAll({
      where: { courseId: req.params.id },
      order: [['order', 'ASC']]
    });

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content', error: error.message });
  }
});

// Update content order
router.put('/:id/content/reorder', authenticateToken, authorizeRoles(['admin', 'instructor']), async (req, res) => {
  try {
    const { orderedContent } = req.body; // Array of { id, order }
    
    await Promise.all(
      orderedContent.map(item => 
        Content.update(
          { order: item.order },
          { where: { id: item.id, courseId: req.params.id } }
        )
      )
    );

    res.json({ message: 'Content reordered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error reordering content', error: error.message });
  }
});

module.exports = router; 
 