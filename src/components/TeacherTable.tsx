import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

// Define the type for the data that you expect in the response
type TimetableData = {
  day: number; // Ensure `day` is a number (0-6 for Sunday to Saturday)
  subject: string;
  time: { start: string; end: string };
  course: string;
  semester: string;
};

type TeacherData = {
  teacherName: string;
  teacherData: TimetableData[]; // Array of timetable data
};

const TeacherTable = ({ selectedTeacher }: any) => {
  const [timetable, setTimetable] = useState<TeacherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});

  const Days: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const getTeacherData = async () => {
    try {
      setIsLoading(true);
      setError(null); // Clear previous error
      const response = await fetch(
        `/api/teacher-details?teacher=${selectedTeacher}`
      );

      if (!response.ok) {
        throw new Error("No timetable found for the selected teacher.");
      }

      const data = await response.json();
      setTimetable(data); // Assuming response contains `teacherData`
    } catch (error: any) {
      setError(error.message); // Set the error message
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTeacher) {
      getTeacherData();
    }
  }, [selectedTeacher]);

  // Group timetable data by day
  const groupedByDay = timetable?.teacherData.reduce((acc, curr) => {
    const day = Days[curr.day]; // Get the name of the day from the `day` index
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(curr);
    return acc;
  }, {} as Record<string, TimetableData[]>);

  const toggleExpandDay = (day: string) => {
    setExpandedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <Card className="p-8 shadow-lg rounded-lg bg-gradient-to-br from-purple-50 to-blue-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Timetable for <span className="text-blue-600">{selectedTeacher}</span>
        </h2>
        {isLoading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="mt-4">
            {groupedByDay ? (
              Object.entries(groupedByDay).map(([day, lessons], index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                    {day}
                  </h3>
                  <div className="grid grid-cols-4 gap-4 text-gray-600 font-semibold">
                    <div>Subject</div>
                    <div>Time</div>
                    <div>Course</div>
                    <div>Semester</div>
                  </div>
                  {(expandedDays[day]
                    ? lessons
                    : lessons.slice(0, 1)
                  ).map((lesson, lessonIndex) => (
                    <div
                      key={lessonIndex}
                      className="grid grid-cols-4 gap-4 items-center mt-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="text-gray-800">{lesson.subject}</div>
                      <div className="text-gray-600">
                        {lesson.time.start} - {lesson.time.end}
                      </div>
                      <div className="text-gray-600">{lesson.course}</div>
                      <div className="text-gray-600">{lesson.semester}</div>
                    </div>
                  ))}
                  {lessons.length > 1 && (
                    <button
                      className="text-blue-600 underline mt-4"
                      onClick={() => toggleExpandDay(day)}
                    >
                      {expandedDays[day] ? "View Less" : "View All"}
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-600">
                No timetable available for this teacher.
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default TeacherTable;
