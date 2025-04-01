import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import LMSLayout from "../../components/LMSLayout";
import { motion } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

interface Discussion {
  id: string;
  title: string;
  course: string;
  author: string;
  replies: number;
  lastReply: string;
  status: "active" | "closed";
}

const DiscussionForums = () => {
  const { user } = useAuth();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/instructor/discussions`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch discussions");
      }

      const data = await response.json();
      setDiscussions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Discussion Forums
          </h1>
          <p className="text-gray-600 mt-2">
            Moderate course discussions and answer student questions
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {discussions.map((discussion) => (
            <motion.div
              key={discussion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {discussion.title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {discussion.course}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      discussion.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {discussion.status.charAt(0).toUpperCase() +
                      discussion.status.slice(1)}
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <UserCircleIcon className="w-5 h-5 mr-1" />
                    {discussion.author}
                  </div>
                  <div className="flex items-center">
                    <ChatBubbleLeftRightIcon className="w-5 h-5 mr-1" />
                    {discussion.replies} replies
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 mr-1" />
                    Last reply:{" "}
                    {new Date(discussion.lastReply).toLocaleDateString()}
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button className="px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors">
                    View Discussion
                  </button>
                  <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    Moderate
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {discussions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">No discussions found</div>
            <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
              Create New Discussion
            </button>
          </div>
        )}
      </div>
    </LMSLayout>
  );
};

export default DiscussionForums;
