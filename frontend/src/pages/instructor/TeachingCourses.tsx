import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import LMSLayout from "../../components/LMSLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  UserGroupIcon,
  CalendarIcon,
  DocumentTextIcon,
  ClockIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";

interface Course {
  id: string;
  title: string;
  description: string;
  code: string;
  students: number;
  startDate: string;
  endDate: string;
  status: "active" | "draft" | "archived";
  contents: Array<{ id: string; title: string; type: string }>;
}

const TeachingCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/instructor/courses`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await response.json();
      setCourses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/instructor/courses/${courseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete course");
      }

      setCourses(courses.filter((course) => course.id !== courseId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete course");
    }
  };

  if (isLoading) {
    return (
      <LMSLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </LMSLayout>
    );
  }

  if (error) {
    return (
      <LMSLayout>
        <div className="text-center text-red-500">{error}</div>
      </LMSLayout>
    );
  }

  return (
    <LMSLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Teaching Courses</h1>
          <button className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
            <PlusIcon className="w-5 h-5 mr-2" />
            Create New Course
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {course.title}
                  </h2>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      course.status === "active"
                        ? "bg-green-100 text-green-800"
                        : course.status === "draft"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {course.status
                      ? course.status.charAt(0).toUpperCase() +
                        course.status.slice(1)
                      : "Unknown"}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {course.description}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium mr-2">Code:</span>
                    {course.code}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <UserGroupIcon className="w-4 h-4 mr-2" />
                    {course.students} students
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {new Date(course.startDate).toLocaleDateString()} -{" "}
                    {new Date(course.endDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to={`/instructor/courses/${course.id}`}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
                  >
                    <DocumentTextIcon className="w-4 h-4 mr-2" />
                    View Details
                  </Link>
                  <Link
                    to={`/instructor/schedule?courseId=${course.id}`}
                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                    title="View Schedule"
                  >
                    <ClockIcon className="w-5 h-5" />
                  </Link>
                  <Link
                    to={`/instructor/submissions?courseId=${course.id}`}
                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                    title="View Submissions"
                  >
                    <ClipboardDocumentCheckIcon className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">No courses found</div>
            <button className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors mx-auto">
              <PlusIcon className="w-5 h-5 mr-2" />
              Create Your First Course
            </button>
          </div>
        )}
      </div>
    </LMSLayout>
  );
};

export default TeachingCourses;
