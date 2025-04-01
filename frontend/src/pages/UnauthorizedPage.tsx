import { Layout } from "../components/Layout";
import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              Access Denied
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              You don't have permission to access this page.
            </p>
          </div>
          <div>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
