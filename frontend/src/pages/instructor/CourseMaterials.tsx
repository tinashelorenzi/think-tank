import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import LMSLayout from "../../components/LMSLayout";
import { motion } from "framer-motion";
import {
  DocumentTextIcon,
  FolderIcon,
  ArrowUpTrayIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface CourseMaterial {
  id: string;
  title: string;
  course: string;
  type: "document" | "video" | "folder";
  size: string;
  lastModified: string;
  downloads: number;
}

const CourseMaterials = () => {
  const { user } = useAuth();
  const [materials, setMaterials] = useState<CourseMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/instructor/materials`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch materials");
      }

      const data = await response.json();
      setMaterials(data);
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
          <h1 className="text-2xl font-bold text-gray-900">Course Materials</h1>
          <p className="text-gray-600 mt-2">
            Upload and manage course content, resources, and materials
          </p>
        </div>

        <div className="mb-6">
          <button className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
            <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
            Upload New Material
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {materials.map((material) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    {material.type === "folder" ? (
                      <FolderIcon className="w-6 h-6 text-yellow-500 mr-3" />
                    ) : (
                      <DocumentTextIcon className="w-6 h-6 text-blue-500 mr-3" />
                    )}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {material.title}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        {material.course}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Type:</span>{" "}
                    {material.type.charAt(0).toUpperCase() +
                      material.type.slice(1)}
                  </div>
                  <div>
                    <span className="font-medium">Size:</span> {material.size}
                  </div>
                  <div>
                    <span className="font-medium">Downloads:</span>{" "}
                    {material.downloads}
                  </div>
                  <div>
                    <span className="font-medium">Last Modified:</span>{" "}
                    {new Date(material.lastModified).toLocaleDateString()}
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button className="px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors">
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    Preview
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {materials.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">No materials found</div>
            <button className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors mx-auto">
              <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
              Upload Your First Material
            </button>
          </div>
        )}
      </div>
    </LMSLayout>
  );
};

export default CourseMaterials;
