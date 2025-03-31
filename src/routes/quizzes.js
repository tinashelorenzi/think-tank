const express = require('express');
const router = express.Router();
const { Quiz, Course, User, Question, QuizAttempt } = require('../models');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Get quizzes for a course
router.get('/course/:courseId', async (req, res) => {
  try {
    const quizzes = await Quiz.findAll({
      where: { courseId: req.params.courseId },
      include: [
        { model: User, as: 'instructor', attributes: ['id', 'username', 'email'] }
      ]
    });
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Error fetching quizzes' });
  }
});

// Create new quiz
router.post('/', authenticateToken, authorizeRoles(['admin', 'instructor']), async (req, res) => {
  try {
    const { title, description, courseId, timeLimit, maxPoints, questions } = req.body;

    // Check if course exists
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Create quiz with questions
    const quiz = await Quiz.create({
      title,
      description,
      courseId,
      timeLimit,
      maxPoints,
      instructorId: req.user.id
    });

    // Create questions
    if (questions && questions.length > 0) {
      await Question.bulkCreate(
        questions.map(q => ({
          ...q,
          quizId: quiz.id
        }))
      );
    }

    res.status(201).json(quiz);
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ message: 'Error creating quiz' });
  }
});

// Get quiz by ID
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id, {
      include: [
        { model: User, as: 'instructor', attributes: ['id', 'username', 'email'] },
        { model: Course, attributes: ['id', 'title'] },
        { model: Question }
      ]
    });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json(quiz);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ message: 'Error fetching quiz' });
  }
});

// Update quiz
router.put('/:id', authenticateToken, authorizeRoles(['admin', 'instructor']), async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Check if user is authorized to update this quiz
    if (req.user.role !== 'admin' && quiz.instructorId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this quiz' });
    }

    const { title, description, timeLimit, maxPoints, questions } = req.body;
    await quiz.update({ title, description, timeLimit, maxPoints });

    // Update questions if provided
    if (questions) {
      // Delete existing questions
      await Question.destroy({ where: { quizId: quiz.id } });
      
      // Create new questions
      if (questions.length > 0) {
        await Question.bulkCreate(
          questions.map(q => ({
            ...q,
            quizId: quiz.id
          }))
        );
      }
    }

    res.json(quiz);
  } catch (error) {
    console.error('Error updating quiz:', error);
    res.status(500).json({ message: 'Error updating quiz' });
  }
});

// Delete quiz
router.delete('/:id', authenticateToken, authorizeRoles(['admin', 'instructor']), async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Check if user is authorized to delete this quiz
    if (req.user.role !== 'admin' && quiz.instructorId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this quiz' });
    }

    await quiz.destroy();
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ message: 'Error deleting quiz' });
  }
});

// Submit quiz attempt
router.post('/:id/submit', authenticateToken, async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id, {
      include: [{ model: Question }]
    });
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const { answers } = req.body;
    
    // Calculate score
    let points = 0;
    const results = quiz.questions.map(question => {
      const isCorrect = question.correctAnswer === answers[question.id];
      if (isCorrect) points += question.points;
      return {
        questionId: question.id,
        isCorrect,
        points: isCorrect ? question.points : 0
      };
    });

    // Create quiz attempt
    const attempt = await QuizAttempt.create({
      quizId: quiz.id,
      studentId: req.user.id,
      answers,
      results,
      points,
      submittedAt: new Date()
    });

    // Update student's total points
    const student = await User.findByPk(req.user.id);
    await student.increment('points', { by: points });

    res.status(201).json(attempt);
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ message: 'Error submitting quiz' });
  }
});

// Get quiz results
router.get('/:id/results', authenticateToken, async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const attempts = await QuizAttempt.findAll({
      where: { quizId: quiz.id },
      include: [
        { model: User, as: 'student', attributes: ['id', 'username', 'email'] }
      ],
      order: [['points', 'DESC']]
    });

    res.json(attempts);
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    res.status(500).json({ message: 'Error fetching quiz results' });
  }
});

module.exports = router; 