"use client";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  TimetableCell,
  TeacherWithSubjects,
  TimeSlot,
  DAYS,
} from "@/lib/types";
import { TimetableData } from "../TimeTableData";

interface TimetableGridProps {
  course: string;
  semester: string;
}

export function TimeTableContainer({ course, semester }: TimetableGridProps) {
  const { toast } = useToast();
  const [timetable, setTimetable] = useState<(TimetableCell | null)[][]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [teachers, setTeachers] = useState<TeacherWithSubjects[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  useEffect(() => {
    fetchTimetableData();
    fetchTeachersAndSubjects();
    fetchTimeSlots();
  }, [course, semester]);

  const fetchTimetableData = async () => {
    try {
      const response = await fetch(
        `/api/timetable?course=${course}&semester=${semester}`
      );
      const data = await response.json();
      setTimetable(data.timetable || Array(5).fill(Array(6).fill(null)));
    } catch (error) {
      console.error("Error fetching timetable:", error);
    }
  };

  const fetchTeachersAndSubjects = async () => {
    try {
      const response = await fetch(
        `/api/teachers-subjects?course=${course}&semester=${semester}`
      );
      const data = await response.json();
      setTeachers(data.teachers || []);
    } catch (error) {
      console.error("Error fetching teachers and subjects:", error);
    }
  };

  const fetchTimeSlots = async () => {
    try {
      const response = await fetch(
        `/api/time?course=${course}&semester=${semester}`
      );
      const data = await response.json();
      setTimeSlots(data.slots || []);
    } catch (error) {
      console.error("Error fetching time slots:", error);
    }
  };

  const handleTeacherChange = (teacherName: string) => {
    setSelectedTeacher(teacherName);
    setSelectedSubject("");
  };

  const getTeacherSubjects = (teacherName: string) => {
    const teacher = teachers.find((t) => t.name === teacherName);
    return teacher?.subjects || [];
  };

  return (
    <div className="p-6 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-white pb-2">
        {course.charAt(0).toUpperCase() + course.slice(1).toLowerCase()} -{" "}
        {semester} Timetable
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full text-center border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-4 text-lg font-semibold border-r">Day/Time</th>
              {timeSlots.map((slot, index) => (
                <th key={index} className="p-4 text-lg font-semibold border-r">
                  {slot.start} - {slot.end}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gradient-to-tr from-blue-100 via-green-100 to-red-100">
            {DAYS.map((day, dayIndex) => (
              <tr key={day} className="cursor-pointer">
                <td className="border p-4 font-medium">{day}</td>
                {timeSlots.map((_, timeIndex) => (
                  <td key={`${day}-${timeIndex}`} className="border p-4">
                    <TimetableData
                      cell={timetable[dayIndex]?.[timeIndex]}
                      selectedTeacher={selectedTeacher}
                      selectedSubject={selectedSubject}
                      teachers={teachers}
                      onTeacherChange={handleTeacherChange}
                      onSubjectChange={setSelectedSubject}
                      getTeacherSubjects={getTeacherSubjects}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
