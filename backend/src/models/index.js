const sequelize = require('../config/database');
const User = require('./User');
const Course = require('./Course');
const Cohort = require('./Cohort');
const Content = require('./Content');
const Assignment = require('./Assignment');
const Submission = require('./Submission');
const Quiz = require('./Quiz');
const Question = require('./Question');
const QuizAttempt = require('./QuizAttempt');
const Score = require('./Score');

// User - Course relationships
Course.belongsTo(User, { as: 'instructor' });
User.hasMany(Course, { as: 'instructedCourses' });

// User - Cohort relationships
Cohort.belongsTo(User, { as: 'instructor' });
User.hasMany(Cohort, { as: 'instructedCohorts' });
Cohort.belongsToMany(User, { as: 'students', through: 'CohortStudents' });
User.belongsToMany(Cohort, { as: 'enrolledCohorts', through: 'CohortStudents' });

// Course - Cohort relationships
Course.hasMany(Cohort);
Cohort.belongsTo(Course);

// Course - Content relationships
Course.hasMany(Content);
Content.belongsTo(Course);

// Course - Assignment relationships
Course.hasMany(Assignment);
Assignment.belongsTo(Course);

// Assignment - Submission relationships
Assignment.hasMany(Submission);
Submission.belongsTo(Assignment);
Submission.belongsTo(User, { as: 'student' });

// Course - Quiz relationships
Course.hasMany(Quiz);
Quiz.belongsTo(Course);
Quiz.belongsTo(User, { as: 'instructor' });

// Quiz - Question relationships
Quiz.hasMany(Question);
Question.belongsTo(Quiz);

// Quiz - QuizAttempt relationships
Quiz.hasMany(QuizAttempt);
QuizAttempt.belongsTo(Quiz);
QuizAttempt.belongsTo(User, { as: 'student' });

// User - Score relationships
User.hasMany(Score);
Score.belongsTo(User);

// Cohort - Score relationships
Cohort.hasMany(Score);
Score.belongsTo(Cohort);

module.exports = {
  sequelize,
  User,
  Course,
  Cohort,
  Content,
  Assignment,
  Submission,
  Quiz,
  Question,
  QuizAttempt,
  Score
}; 