import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import StudentDashboard from "./pages/student/Dashboard";
import InstructorDashboard from "./pages/instructor/Dashboard";
import TeachingCourses from "./pages/instructor/TeachingCourses";
import StudentSubmissions from "./pages/instructor/StudentSubmissions";
import ClassSchedule from "./pages/instructor/ClassSchedule";
import StudentProgress from "./pages/instructor/StudentProgress";
import DiscussionForums from "./pages/instructor/DiscussionForums";
import CourseMaterials from "./pages/instructor/CourseMaterials";
import AdminDashboard from "./pages/admin/Dashboard";
import UnauthorizedPage from "./pages/UnauthorizedPage";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedUserTypes: string[];
}

const ProtectedRoute = ({
  children,
  allowedUserTypes,
}: ProtectedRouteProps) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedUserTypes.includes(user.type)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Protected Routes */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedUserTypes={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          {/* Instructor Routes */}
          <Route
            path="/instructor/dashboard"
            element={
              <ProtectedRoute allowedUserTypes={["instructor"]}>
                <InstructorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/courses"
            element={
              <ProtectedRoute allowedUserTypes={["instructor"]}>
                <TeachingCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/submissions"
            element={
              <ProtectedRoute allowedUserTypes={["instructor"]}>
                <StudentSubmissions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/schedule"
            element={
              <ProtectedRoute allowedUserTypes={["instructor"]}>
                <ClassSchedule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/progress"
            element={
              <ProtectedRoute allowedUserTypes={["instructor"]}>
                <StudentProgress />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/discussions"
            element={
              <ProtectedRoute allowedUserTypes={["instructor"]}>
                <DiscussionForums />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/materials"
            element={
              <ProtectedRoute allowedUserTypes={["instructor"]}>
                <CourseMaterials />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedUserTypes={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
