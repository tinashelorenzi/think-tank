const express = require("express");
const router = express.Router();
const { Course, Content, User, Submission, Discussion } = require("../models");
const { authenticateToken } = require("../middleware/auth");

// Get all courses for the instructor
router.get("/courses", authenticateToken, async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { instructorId: req.user.id },
      include: [
        {
          model: Content,
          required: false,
          attributes: ["id", "title", "type"],
        },
      ],
    });

    // Transform the response to match frontend expectations
    const transformedCourses = courses.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      code: course.code,
      students: course.students || 0,
      startDate: course.startDate,
      endDate: course.endDate,
      status: course.status,
      contents: course.Contents || []
    }));

    res.json(transformedCourses);
  } catch (error) {
    console.error("Error fetching instructor courses:", error);
    res.status(500).json({ message: "Error fetching courses" });
  }
});

// Get all submissions for the instructor's courses
router.get("/submissions", authenticateToken, async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { instructorId: req.user.id },
      attributes: ['id', 'title'],
      include: [{
        model: Submission,
        include: [{
          model: User,
          attributes: ['name'],
        }],
      }],
    });

    const transformedSubmissions = courses.flatMap(course => 
      course.Submissions.map(submission => ({
        id: submission.id,
        studentName: submission.User.name,
        courseTitle: course.title,
        submittedAt: submission.submittedAt,
        status: submission.status,
        grade: submission.grade,
        feedback: submission.feedback
      }))
    );

    res.json(transformedSubmissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ message: "Error fetching submissions" });
  }
});

// Get student progress for all courses
router.get("/progress", authenticateToken, async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { instructorId: req.user.id },
      include: [
        {
          model: User,
          as: "students",
          through: { attributes: [] },
          attributes: ["id", "name"],
        },
      ],
    });

    const progress = await Promise.all(
      courses.flatMap(course =>
        course.students.map(async student => {
          const submissions = await Submission.findAll({
            where: {
              courseId: course.id,
              userId: student.id,
            },
          });

          const completedSubmissions = submissions.filter(s => s.status === "submitted");
          const averageGrade = completedSubmissions.length > 0
            ? completedSubmissions.reduce((acc, curr) => acc + (curr.grade || 0), 0) / completedSubmissions.length
            : 0;

          return {
            id: student.id,
            name: student.name,
            course: course.title,
            assignmentsCompleted: completedSubmissions.length,
            totalAssignments: submissions.length,
            averageGrade: Math.round(averageGrade),
            lastActive: new Date().toISOString(), // This should be updated based on actual last activity
          };
        })
      )
    );

    res.json(progress);
  } catch (error) {
    console.error("Error fetching student progress:", error);
    res.status(500).json({ message: "Error fetching student progress" });
  }
});

// Get all discussions for the instructor's courses
router.get("/discussions", authenticateToken, async (req, res) => {
  try {
    const discussions = await Discussion.findAll({
      include: [
        {
          model: Course,
          where: { instructorId: req.user.id },
          attributes: ["title"],
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const transformedDiscussions = discussions.map(discussion => ({
      id: discussion.id,
      title: discussion.title,
      course: discussion.Course.title,
      author: discussion.User.name,
      replies: discussion.replies || 0,
      lastReply: discussion.lastReply,
      status: discussion.status
    }));

    res.json(transformedDiscussions);
  } catch (error) {
    console.error("Error fetching discussions:", error);
    res.status(500).json({ message: "Error fetching discussions" });
  }
});

// Get all course materials
router.get("/materials", authenticateToken, async (req, res) => {
  try {
    const contents = await Content.findAll({
      include: [
        {
          model: Course,
          where: { instructorId: req.user.id },
          attributes: ["title"],
        },
      ],
    });

    const transformedMaterials = contents.map(content => ({
      id: content.id,
      title: content.title,
      course: content.Course.title,
      type: content.type,
      size: content.size || "N/A",
      lastModified: content.updatedAt,
      downloads: content.downloads || 0
    }));

    res.json(transformedMaterials);
  } catch (error) {
    console.error("Error fetching materials:", error);
    res.status(500).json({ message: "Error fetching materials" });
  }
});

module.exports = router; 