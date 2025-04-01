import { useAuth } from "../../contexts/AuthContext";
import LMSLayout from "../../components/LMSLayout";
import { motion } from "framer-motion";

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <LMSLayout>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">Student Dashboard</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Enrolled Courses */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Enrolled Courses
            </h2>
            <p className="text-gray-600 mb-4">
              View and access your current courses
            </p>
            <button className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors">
              View Courses
            </button>
          </motion.div>

          {/* Upcoming Assignments */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Upcoming Assignments
            </h2>
            <p className="text-gray-600 mb-4">
              Check your pending assignments and deadlines
            </p>
            <button className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors">
              View Assignments
            </button>
          </motion.div>

          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Progress Overview
            </h2>
            <p className="text-gray-600 mb-4">
              Track your learning progress and achievements
            </p>
            <button className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors">
              View Progress
            </button>
          </motion.div>

          {/* Discussion Forums */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Discussion Forums
            </h2>
            <p className="text-gray-600 mb-4">
              Engage with peers and instructors
            </p>
            <button className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors">
              View Forums
            </button>
          </motion.div>

          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Calendar
            </h2>
            <p className="text-gray-600 mb-4">
              View your class schedule and deadlines
            </p>
            <button className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors">
              View Calendar
            </button>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Resources
            </h2>
            <p className="text-gray-600 mb-4">
              Access learning materials and study resources
            </p>
            <button className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors">
              View Resources
            </button>
          </motion.div>
        </div>
      </div>
    </LMSLayout>
  );
};

export default StudentDashboard;
