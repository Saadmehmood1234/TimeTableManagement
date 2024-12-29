"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
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
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");
  const [viewAllTeacher, setViewAllTeacher] = useState(false);
  const [teacher, setTeacher] = useState([]);
  
  useEffect(() => {
    setSelectedTeacher("bca");
  }, []);

  const getData = async () => {
    try {
      const response = await fetch("/api/get-teacher");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const teacherData = await response.json();
      console.log(teacherData);
      console.log("All Teacher", teacherData.data[0].name);
      setTeacher(teacherData.data);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };
  console.log("king", teacher);
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 text-black dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Teacher Detail</h1>
          <div className="flex w-full max-sm:flex-col gap-4">
            <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
              <SelectTrigger className="w-[180px] max-sm:w-full">
                <SelectValue placeholder="Select Teacher" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                {teacher.map((c: any, index: number) => (
                  <SelectItem key={index} value={c.name}>
                    {c.name}
                  </SelectItem> // Use a unique field for value
                ))}
              </SelectContent>
            </Select>
            <div className="gap-4 flex justify-center text-white items-center border-gray-300">
              <Button onClick={() => setViewAllTeacher(!viewAllTeacher)}>
                All Teachers
              </Button>
            </div>
          </div>
        </div>
        <div>{viewAllTeacher && <AllCourse />}</div>
        {selectedTeacher && (
          <div className="flex flex-col gap-2">
            <div className="lg:col-span-2">
              <Card className="p-6">
                <TeacherTable selectedTeacher={selectedTeacher} teacher={teacher}/>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
