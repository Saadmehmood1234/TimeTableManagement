"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
const TeacherTable = ({ teacher, selectedTeacher }: any) => {
  const [timetable, setTimetable] = useState<any | null>(null); // State to store timetable of selected teacher
  const [isLoading, setIsLoading] = useState(false);
  const getTeacherData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/teacher-details?teacher=${selectedTeacher}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch teacher availability");
      }

      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.error("Error fetching teacher availability:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getTeacherData();
  }, []);
  console.log("My Teacher", teacher);
  return (
    <div className="flex flex-col gap-2">
      <div className="lg:col-span-2">
        {/* <Card className="p-6">
          <h2 className="text-2xl font-semibold">
            Timetable for {selectedTeacher}
          </h2>
          <div className="mt-4">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Day</th>
                  <th className="border p-2">Subject</th>
                  <th className="border p-2">Time</th>
                  <th className="border p-2">Course</th>
                  <th className="border p-2">Semester</th>
                </tr>
              </thead>
              <tbody>
                {timetable.map((t: any, index: number) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{t.day}</td>
                    <td className="border px-4 py-2">{t.subject}</td>
                    <td className="border px-4 py-2">{t.time}</td>
                    <td className="border px-4 py-2">{t.course}</td>
                    <td className="border px-4 py-2">{t.semester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card> */}
      </div>
    </div>
  );
};

export default TeacherTable;
