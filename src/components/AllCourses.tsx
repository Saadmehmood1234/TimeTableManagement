"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { div } from "framer-motion/client";
import { useEffect } from "react";
interface AddCourseProps {
  course: string;
  semester: string;
}

export function AllCourse() {
  const [course, setCourse] = useState([]);
  const [semester, setSemester] = useState("");
  const getData = async () => {
    try {
      const response = await fetch("/api/get-course");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const courseData = await response.json();
      console.log(courseData);
      console.log(courseData.data[0].course);
      setCourse(courseData.data);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };
  console.log(course);
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Courses</th>
              <th className="border p-2">Semester</th>
            </tr>
          </thead>
          <tbody>
            {course.map((c: any, index: any) => {
              return (
                <tr key={index}>
                  <td className="border p-2 font-medium">{c.course}</td>
                  <td className="border p-2 font-medium">{c.semester}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
