import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import LMSLayout from "../../components/LMSLayout";
import { motion } from "framer-motion";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

interface ClassSchedule {
  id: string;
  courseTitle: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  room: string;
  students: number;
}

const ClassSchedule = () => {
  const { user } = useAuth();
  const [schedule, setSchedule] = useState<ClassSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>("all");

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/instructor/schedule`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch schedule");
      }

      const data = await response.json();
      setSchedule(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSchedule = async (scheduleId: string) => {
    if (!confirm("Are you sure you want to delete this schedule?")) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/instructor/schedule/${scheduleId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete schedule");
      }

      setSchedule(schedule.filter((item) => item.id !== scheduleId));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete schedule"
      );
    }
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const filteredSchedule =
    selectedDay === "all"
      ? schedule
      : schedule.filter((item) => item.dayOfWeek === selectedDay);

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
          <h1 className="text-2xl font-bold text-gray-900">Class Schedule</h1>
          <button className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Schedule
          </button>
        </div>

        {/* Day Filter */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedDay("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                selectedDay === "all"
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Days
            </button>
            {daysOfWeek.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  selectedDay === day
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchedule.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {item.courseTitle}
                  </h2>
                  <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                    {item.students} students
                  </span>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {item.dayOfWeek}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Time:</span>
                    {item.startTime} - {item.endTime}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Room:</span>
                    {item.room}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center px-3 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors">
                    View Details
                  </button>
                  <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteSchedule(item.id)}
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredSchedule.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">No classes scheduled</div>
            <button className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors mx-auto">
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Your First Class
            </button>
          </div>
        )}
      </div>
    </LMSLayout>
  );
};

export default ClassSchedule;
