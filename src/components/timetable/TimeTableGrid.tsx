// "use client";

// import { useState, useEffect } from "react";
// import { Edit2, Save, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";
// import { TimetableCell } from "@/lib/types";

// interface TimetableGridProps {
//   course: string;
//   semester: string;
// }
// const dummyTimetable: TimetableCell[][] = [
//   [
//     { teacher: "Dr. Smith", subject: "Mathematics" },
//     { teacher: "Ms. Johnson", subject: "Physics" },
//     null,
//     null,
//     { teacher: "Mr. Brown", subject: "Chemistry" },
//     null,
//   ],
//   Array(6).fill(null), // Each sub-array should have the correct number of slots
//   Array(6).fill(null),
//   Array(6).fill(null),
//   Array(6).fill(null),
// ];

// const dummyTeachers = ["Dr. Smith", "Ms. Johnson", "Mr. Brown", "Prof. White"];
// const dummySubjects = ["Mathematics", "Physics", "Chemistry", "Biology"];

// const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
// const TIME_SLOTS = [
//   "9:00-10:00",
//   "10:00-11:00",
//   "11:00-12:00",
//   "12:00-1:00",
//   "2:00-3:00",
//   "3:00-4:00",
// ];

// export function TimetableGrid({ course, semester }: TimetableGridProps) {
//   const { toast } = useToast();
//   const [timetable, setTimetable] = useState<TimetableCell[][]>([]);
//   const [editingCell, setEditingCell] = useState<{
//     day: number;
//     time: number;
//   } | null>(null);
//   const [teachers, setTeachers] = useState<string[]>([]);
//   const [subjects, setSubjects] = useState<string[]>([]);

//   useEffect(() => {
//     fetchTimetableData();
//     fetchTeachersAndSubjects();
//   }, [course, semester]);

//   const fetchTimetableData = async () => {
//     try {
//       const response = await fetch(
//         `/api/timetable?course=${course}&semester=${semester}`
//       );
//       const data = await response.json();
//       console.log(data)
//       setTimetable(data.timetable);
//     } catch (error) {
//       console.error("Error fetching timetable:", error);
//     }
//   };

//   const fetchTeachersAndSubjects = async () => {
//     try {
//       const response = await fetch(
//         `/api/teachers-subjects?course=${course}&semester=${semester}`
//       );
//       const data = await response.json();
//       setTeachers(data.teachers);
//       setSubjects(data.subjects);
//     } catch (error) {
//       console.error("Error fetching teachers and subjects:", error);
//     }
//   };

//   const handleCellEdit = (day: number, time: number) => {
//     setEditingCell({ day, time });
//   };

//   const handleCellSave = async (
//     day: number,
//     time: number,
//     teacher: string,
//     subject: string
//   ) => {
//     try {
//       const response = await fetch("/api/timetable", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           course,
//           semester,
//           day,
//           time,
//           teacher,
//           subject,
//         }),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message);
//       }

//       // Update local state
//       const newTimetable = [...timetable];
//       newTimetable[day][time] = { teacher, subject };
//       setTimetable(newTimetable);
//       setEditingCell(null);

//       toast({
//         title: "Success",
//         description: "Timetable updated successfully",
//       });
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full border-collapse">
//         <thead>
//           <tr>
//             <th className="border p-2">Day/Time</th>
//             {TIME_SLOTS.map((time) => (
//               <th key={time} className="border p-2">
//                 {time}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {DAYS.map((day, dayIndex) => (
//             <tr key={day}>
//               <td className="border p-2 font-medium">{day}</td>
//               {TIME_SLOTS.map((_, timeIndex) => (
//                 <td key={`${day}-${timeIndex}`} className="border p-2">
//                   {editingCell?.day === dayIndex &&
//                   editingCell?.time === timeIndex ? (
//                     <div className="space-y-2">
//                       <Select
//                         onValueChange={(value) =>
//                           handleCellSave(
//                             dayIndex,
//                             timeIndex,
//                             value,
//                             timetable[dayIndex]?.[timeIndex]?.subject || ""
//                           )
//                         }
//                         defaultValue={
//                           timetable[dayIndex]?.[timeIndex]?.teacher || ""
//                         }
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select Teacher" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {teachers.map((teacher) => (
//                             <SelectItem key={teacher} value={teacher}>
//                               {teacher}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>

//                       <Select
//                         onValueChange={(value) =>
//                           handleCellSave(
//                             dayIndex,
//                             timeIndex,
//                             timetable[dayIndex]?.[timeIndex]?.teacher || "",
//                             value
//                           )
//                         }
//                         defaultValue={
//                           timetable[dayIndex]?.[timeIndex]?.subject || ""
//                         }
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select Subject" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {subjects.map((subject) => (
//                             <SelectItem key={subject} value={subject}>
//                               {subject}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>

//                       <div className="flex gap-2">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => setEditingCell(null)}
//                         >
//                           <X className="h-4 w-4 text-black" />
//                         </Button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div
//                       className="min-h-[80px] flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
//                       onClick={() => handleCellEdit(dayIndex, timeIndex)}
//                     >
//                       {timetable[dayIndex]?.[timeIndex] ? (
//                         <>
//                           <p className="font-medium">
//                             {timetable[dayIndex][timeIndex].teacher}
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             {timetable[dayIndex][timeIndex].subject}
//                           </p>
//                         </>
//                       ) : (
//                         <p className="text-gray-400">No class</p>
//                       )}
//                     </div>
//                   )}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { Edit2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { TimetableCell } from "@/lib/types";

interface TimetableGridProps {
  course: string;
  semester: string;
}

interface TeacherWithSubjects {
  name: string;
  subjects: string[];
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const TIME_SLOTS = [
  "9:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "12:00-1:00",
  "2:00-3:00",
  "3:00-4:00",
];

export function TimetableGrid({ course, semester }: TimetableGridProps) {
  const { toast } = useToast();
  const [timetable, setTimetable] = useState<TimetableCell[][]>([]);
  const [editingCell, setEditingCell] = useState<{
    day: number;
    time: number;
  } | null>(null);
  const [teachers, setTeachers] = useState<TeacherWithSubjects[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  useEffect(() => {
    fetchTimetableData();
    fetchTeachersAndSubjects();
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

  const handleCellEdit = (day: number, time: number) => {
    setEditingCell({ day, time });
    const currentCell = timetable[day]?.[time];
    if (currentCell) {
      setSelectedTeacher(currentCell.teacher);
      setSelectedSubject(currentCell.subject);
    } else {
      setSelectedTeacher("");
      setSelectedSubject("");
    }
  };

  const handleTeacherChange = (teacherName: string) => {
    setSelectedTeacher(teacherName);
    setSelectedSubject(""); // Reset subject when teacher changes
  };

  const handleCellSave = async () => {
    if (!selectedTeacher || !selectedSubject) {
      toast({
        title: "Error",
        description: "Please select both teacher and subject",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/timetable", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course,
          semester,
          day: editingCell?.day,
          time: editingCell?.time,
          teacher: selectedTeacher,
          subject: selectedSubject,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      // Update local state
      const newTimetable = [...timetable];
      if (!Array.isArray(newTimetable[editingCell!.day])) {
        newTimetable[editingCell!.day] = Array(6).fill(null);
      }
      newTimetable[editingCell!.day][editingCell!.time] = {
        teacher: selectedTeacher,
        subject: selectedSubject,
      };
      setTimetable(newTimetable);
      setEditingCell(null);
      setSelectedTeacher("");
      setSelectedSubject("");

      toast({
        title: "Success",
        description: "Timetable updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getTeacherSubjects = (teacherName: string) => {
    const teacher = teachers.find(t => t.name === teacherName);
    return teacher?.subjects || [];
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Day/Time</th>
            {TIME_SLOTS.map((time) => (
              <th key={time} className="border p-2">
                {time}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DAYS.map((day, dayIndex) => (
            <tr key={day}>
              <td className="border p-2 font-medium">{day}</td>
              {TIME_SLOTS.map((_, timeIndex) => (
                <td key={`${day}-${timeIndex}`} className="border p-2">
                  {editingCell?.day === dayIndex &&
                  editingCell?.time === timeIndex ? (
                    <div className="space-y-2">
                      <Select
                        value={selectedTeacher}
                        onValueChange={handleTeacherChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Teacher" />
                        </SelectTrigger>
                        <SelectContent>
                          {teachers.map((teacher) => (
                            <SelectItem key={teacher.name} value={teacher.name}>
                              {teacher.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {selectedTeacher && (
                        <Select
                          value={selectedSubject}
                          onValueChange={setSelectedSubject}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {getTeacherSubjects(selectedTeacher).map((subject) => (
                              <SelectItem key={subject} value={subject}>
                                {subject}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingCell(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleCellSave}
                          disabled={!selectedTeacher || !selectedSubject}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="min-h-[80px] flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => handleCellEdit(dayIndex, timeIndex)}
                    >
                      {timetable[dayIndex]?.[timeIndex] ? (
                        <>
                          <p className="font-medium">
                            {timetable[dayIndex][timeIndex].teacher}
                          </p>
                          <p className="text-sm text-gray-500">
                            {timetable[dayIndex][timeIndex].subject}
                          </p>
                        </>
                      ) : (
                        <p className="text-gray-400">No class</p>
                      )}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}