"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AllCourse } from "@/components/AllCourses";
import TeacherTable from "./TeacherTable";

export default function TeacherDetails() {
  const [selectedTeacher, setSelectedTeacher] = useState<string>("All");
  const [viewAllTeacher, setViewAllTeacher] = useState(false);
  const [teacher, setTeacher] = useState<any[]>([]);
  const [timetable, setTimetable] = useState<any | null>(null);

  // Fetch teachers from the API
  const getData = async () => {
    try {
      const response = await fetch("/api/get-teacher");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const teacherData = await response.json();
      setTeacher(teacherData.data);
    } catch (error) {
      console.error("Error fetching teacher data:", error);
    }
  };

  // Simulated API to fetch timetable for the selected teacher
  const getTeacherTimetable = (teacherName: string) => {
    if (teacherName !== "All") {
      const dummyTimetable = [
        { day: "Monday", subject: "Math", time: "9:00 AM - 11:00 AM", course: "BCA", semester: "1" },
        { day: "Tuesday", subject: "Physics", time: "10:00 AM - 12:00 PM", course: "BCA", semester: "1" },
        { day: "Wednesday", subject: "Chemistry", time: "11:00 AM - 1:00 PM", course: "BCA", semester: "1" },
        { day: "Thursday", subject: "English", time: "2:00 PM - 4:00 PM", course: "BCA", semester: "2" },
        { day: "Friday", subject: "Computer Science", time: "1:00 PM - 3:00 PM", course: "BCA", semester: "2" },
      ];
      setTimetable(dummyTimetable);
    } else {
      setTimetable(null);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Fetch timetable when the selected teacher changes
  useEffect(() => {
    if (selectedTeacher !== "All") {
      getTeacherTimetable(selectedTeacher);
    } else {
      setTimetable(null);
    }
  }, [selectedTeacher]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            Teacher Details
          </h1>
          <div className="flex w-full max-sm:flex-col gap-4">
            <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
              <SelectTrigger className="w-[200px] max-sm:w-full shadow-md">
                <SelectValue placeholder="Select Teacher" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                {teacher.map((c: any, index: number) => (
                  <SelectItem key={index} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => setViewAllTeacher(!viewAllTeacher)}
              className="shadow-md bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              View All Teachers
            </Button>
          </div>
        </div>

        {/* Timetable or Teacher Details */}
        <div className="space-y-6">
          {viewAllTeacher && <AllCourse />}

          {selectedTeacher !== "All" && timetable && (
            <TeacherTable selectedTeacher={selectedTeacher}  />
          )}
        </div>

        {/* Table for All Teachers */}
        {selectedTeacher === "All" && (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="border p-4 font-bold">Teacher</th>
                  <th className="border p-4 font-bold">Subjects</th>
                  <th className="border p-4 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teacher.map((tdata: any, index: number) => (
                  <tr key={index} className="hover:bg-indigo-50">
                    <td className="border p-4">{tdata.name}</td>
                    <td className="border p-4">
                      <ul className="pl-4 grid grid-cols-2 gap-2">
                        {tdata.subjects.map((subject: string, i: number) => (
                          <li key={i} className="text-sm bg-indigo-50 px-2 py-1 rounded-md">
                            {subject}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="border p-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedTeacher(tdata.name)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
