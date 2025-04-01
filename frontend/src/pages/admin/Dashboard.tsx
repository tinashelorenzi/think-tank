import { useAuth } from "../../contexts/AuthContext";
import LMSLayout from "../../components/LMSLayout";
import { motion } from "framer-motion";

const AdminDashboard = () => {
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
          <p className="text-gray-600">Administrative Dashboard</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Management */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              User Management
            </h2>
            <p className="text-gray-600 mb-4">
              Manage users, roles, and permissions
            </p>
            <button className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors">
              Manage Users
            </button>
          </motion.div>

          {/* Course Management */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Course Management
            </h2>
            <p className="text-gray-600 mb-4">
              Oversee all courses and content
            </p>
            <button className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors">
              Manage Courses
            </button>
          </motion.div>

          {/* Analytics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Analytics
            </h2>
            <p className="text-gray-600 mb-4">
              View platform usage and performance metrics
            </p>
            <button className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors">
              View Analytics
            </button>
          </motion.div>

          {/* System Settings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              System Settings
            </h2>
            <p className="text-gray-600 mb-4">
              Configure platform settings and preferences
            </p>
            <button className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors">
              Manage Settings
            </button>
          </motion.div>

          {/* Reports */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Reports
            </h2>
            <p className="text-gray-600 mb-4">
              Generate and view system reports
            </p>
            <button className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors">
              View Reports
            </button>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Support
            </h2>
            <p className="text-gray-600 mb-4">
              Handle user support and tickets
            </p>
            <button className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors">
              Manage Support
            </button>
          </motion.div>
        </div>
      </div>
    </LMSLayout>
  );
};

export default AdminDashboard;
