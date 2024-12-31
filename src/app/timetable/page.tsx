"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimetableGrid } from "@/components/timetable/TimeTableGrid";
import { TeacherStats } from "@/components/timetable/TeacherStats";
import { TeacherSubjectForm } from "@/components/timetable/TeacherSubjectForm";
import { AddCourse } from "@/components/AddCourse";
import { AllCourse } from "@/components/AllCourses";
export default function TimetablePage() {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [viewCourse, setViewCourse] = useState(false);
  const [viewAllCourse, setViewAllCourse] = useState(false);
  const [course, setCourse] = useState([]);
  // Set default values on component mount
  useEffect(() => {
    setSelectedCourse("bca");
    setSelectedSemester("5");  
  }, []);


  const getData = async () => {
    try {
      const response = await fetch("/api/get-course"); 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const courseData = await response.json();
      console.log(courseData);
      console.log(courseData.data[0].course)
      setCourse(courseData.data)
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };
  console.log(course)
  useEffect(() => {
    getData();
  }, []);
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 text-black dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Timetable Management</h1>
          <div className="flex w-full max-sm:flex-col gap-4">
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-[180px] max-sm:w-full">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="bca">BCA</SelectItem>
                {course.map((c:any,index:any)=>{
                  return(
                    <SelectItem key={index} value={c.course}>{c.course}</SelectItem> 
                  )
                })}
              </SelectContent>
            </Select>
            <Select
              value={selectedSemester}
              onValueChange={setSelectedSemester}
            >
              <SelectTrigger className="w-[180px] max-sm:w-full">
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <SelectItem key={sem} value={sem.toString()}>
                    Semester {sem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className=" gap-4  flex justify-center text-white items-center  border-gray-300">
              <Link href='/teacher'><Button >All Courses</Button></Link>
              <Button  onClick={() => setViewCourse(!viewCourse)}>
                Add Course <Plus className="w-4 h-4 mr-2" />
              </Button>
            </div>
          </div>
        </div>
        <div>{viewCourse && <AddCourse />}</div>
        {selectedCourse && selectedSemester && (
          <div className="flex flex-col gap-2">
            <div className="lg:col-span-2">
              <Card className="p-6">
                <TimetableGrid
                  course={selectedCourse}
                  semester={selectedSemester}
                />
              </Card>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-10 ">
              <div>
                <Card className="p-6 w-full">
                  <TeacherSubjectForm
                    course={selectedCourse}
                    semester={selectedSemester}
                  />
                </Card>
              </div>
              <Card className="p-6 w-full">
                <TeacherStats />
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
