import { useAuth } from "../../contexts/AuthContext";
import LMSLayout from "../../components/LMSLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpenIcon,
  ClipboardDocumentCheckIcon,
  CalendarIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const InstructorDashboard = () => {
  const { user } = useAuth();

  const dashboardItems = [
    {
      title: "Teaching Courses",
      description:
        "Manage your courses, create new ones, and track student progress",
      icon: BookOpenIcon,
      link: "/instructor/courses",
      color: "bg-blue-50 text-blue-600",
      hoverColor: "hover:bg-blue-100",
    },
    {
      title: "Student Submissions",
      description: "Review and grade student assignments and submissions",
      icon: ClipboardDocumentCheckIcon,
      link: "/instructor/submissions",
      color: "bg-green-50 text-green-600",
      hoverColor: "hover:bg-green-100",
    },
    {
      title: "Class Schedule",
      description: "View and manage your teaching schedule and class timings",
      icon: CalendarIcon,
      link: "/instructor/schedule",
      color: "bg-purple-50 text-purple-600",
      hoverColor: "hover:bg-purple-100",
    },
    {
      title: "Student Progress",
      description: "Monitor student performance and track learning outcomes",
      icon: UserGroupIcon,
      link: "/instructor/progress",
      color: "bg-yellow-50 text-yellow-600",
      hoverColor: "hover:bg-yellow-100",
    },
    {
      title: "Discussion Forums",
      description: "Moderate course discussions and answer student questions",
      icon: ChatBubbleLeftRightIcon,
      link: "/instructor/discussions",
      color: "bg-red-50 text-red-600",
      hoverColor: "hover:bg-red-100",
    },
    {
      title: "Course Materials",
      description: "Upload and manage course content, resources, and materials",
      icon: DocumentTextIcon,
      link: "/instructor/materials",
      color: "bg-indigo-50 text-indigo-600",
      hoverColor: "hover:bg-indigo-100",
    },
  ];

  return (
    <LMSLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's an overview of your teaching activities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.link}
                className={`block p-6 bg-white rounded-xl shadow-sm border border-gray-100 ${item.hoverColor} transition-colors`}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${item.color} mr-4`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h2>
                </div>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </LMSLayout>
  );
};

export default InstructorDashboard;
