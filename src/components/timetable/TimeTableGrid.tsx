// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { Edit2, Save, X } from "lucide-react";
// // // import { Button } from "@/components/ui/button";
// // // import {
// // //   Select,
// // //   SelectContent,
// // //   SelectItem,
// // //   SelectTrigger,
// // //   SelectValue,
// // // } from "@/components/ui/select";
// // // import { Input } from "@/components/ui/input";
// // // import { useToast } from "@/hooks/use-toast";
// // // import { TimetableCell } from "@/lib/types";

// // // interface TimetableGridProps {
// // //   course: string;
// // //   semester: string;
// // // }
// // // const dummyTimetable: TimetableCell[][] = [
// // //   [
// // //     { teacher: "Dr. Smith", subject: "Mathematics" },
// // //     { teacher: "Ms. Johnson", subject: "Physics" },
// // //     null,
// // //     null,
// // //     { teacher: "Mr. Brown", subject: "Chemistry" },
// // //     null,
// // //   ],
// // //   Array(6).fill(null), // Each sub-array should have the correct number of slots
// // //   Array(6).fill(null),
// // //   Array(6).fill(null),
// // //   Array(6).fill(null),
// // // ];

// // // const dummyTeachers = ["Dr. Smith", "Ms. Johnson", "Mr. Brown", "Prof. White"];
// // // const dummySubjects = ["Mathematics", "Physics", "Chemistry", "Biology"];

// // // const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
// // // const TIME_SLOTS = [
// // //   "9:00-10:00",
// // //   "10:00-11:00",
// // //   "11:00-12:00",
// // //   "12:00-1:00",
// // //   "2:00-3:00",
// // //   "3:00-4:00",
// // // ];

// // // export function TimetableGrid({ course, semester }: TimetableGridProps) {
// // //   const { toast } = useToast();
// // //   const [timetable, setTimetable] = useState<TimetableCell[][]>([]);
// // //   const [editingCell, setEditingCell] = useState<{
// // //     day: number;
// // //     time: number;
// // //   } | null>(null);
// // //   const [teachers, setTeachers] = useState<string[]>([]);
// // //   const [subjects, setSubjects] = useState<string[]>([]);

// // //   useEffect(() => {
// // //     fetchTimetableData();
// // //     fetchTeachersAndSubjects();
// // //   }, [course, semester]);

// // //   const fetchTimetableData = async () => {
// // //     try {
// // //       const response = await fetch(
// // //         `/api/timetable?course=${course}&semester=${semester}`
// // //       );
// // //       const data = await response.json();
// // //       console.log(data)
// // //       setTimetable(data.timetable);
// // //     } catch (error) {
// // //       console.error("Error fetching timetable:", error);
// // //     }
// // //   };

// // //   const fetchTeachersAndSubjects = async () => {
// // //     try {
// // //       const response = await fetch(
// // //         `/api/teachers-subjects?course=${course}&semester=${semester}`
// // //       );
// // //       const data = await response.json();
// // //       setTeachers(data.teachers);
// // //       setSubjects(data.subjects);
// // //     } catch (error) {
// // //       console.error("Error fetching teachers and subjects:", error);
// // //     }
// // //   };

// // //   const handleCellEdit = (day: number, time: number) => {
// // //     setEditingCell({ day, time });
// // //   };

// // //   const handleCellSave = async (
// // //     day: number,
// // //     time: number,
// // //     teacher: string,
// // //     subject: string
// // //   ) => {
// // //     try {
// // //       const response = await fetch("/api/timetable", {
// // //         method: "PUT",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify({
// // //           course,
// // //           semester,
// // //           day,
// // //           time,
// // //           teacher,
// // //           subject,
// // //         }),
// // //       });

// // //       if (!response.ok) {
// // //         const error = await response.json();
// // //         throw new Error(error.message);
// // //       }

// // //       // Update local state
// // //       const newTimetable = [...timetable];
// // //       newTimetable[day][time] = { teacher, subject };
// // //       setTimetable(newTimetable);
// // //       setEditingCell(null);

// // //       toast({
// // //         title: "Success",
// // //         description: "Timetable updated successfully",
// // //       });
// // //     } catch (error: any) {
// // //       toast({
// // //         title: "Error",
// // //         description: error.message,
// // //         variant: "destructive",
// // //       });
// // //     }
// // //   };

// // //   return (
// // //     <div className="overflow-x-auto">
// // //       <table className="w-full border-collapse">
// // //         <thead>
// // //           <tr>
// // //             <th className="border p-2">Day/Time</th>
// // //             {TIME_SLOTS.map((time) => (
// // //               <th key={time} className="border p-2">
// // //                 {time}
// // //               </th>
// // //             ))}
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {DAYS.map((day, dayIndex) => (
// // //             <tr key={day}>
// // //               <td className="border p-2 font-medium">{day}</td>
// // //               {TIME_SLOTS.map((_, timeIndex) => (
// // //                 <td key={`${day}-${timeIndex}`} className="border p-2">
// // //                   {editingCell?.day === dayIndex &&
// // //                   editingCell?.time === timeIndex ? (
// // //                     <div className="space-y-2">
// // //                       <Select
// // //                         onValueChange={(value) =>
// // //                           handleCellSave(
// // //                             dayIndex,
// // //                             timeIndex,
// // //                             value,
// // //                             timetable[dayIndex]?.[timeIndex]?.subject || ""
// // //                           )
// // //                         }
// // //                         defaultValue={
// // //                           timetable[dayIndex]?.[timeIndex]?.teacher || ""
// // //                         }
// // //                       >
// // //                         <SelectTrigger>
// // //                           <SelectValue placeholder="Select Teacher" />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           {teachers.map((teacher) => (
// // //                             <SelectItem key={teacher} value={teacher}>
// // //                               {teacher}
// // //                             </SelectItem>
// // //                           ))}
// // //                         </SelectContent>
// // //                       </Select>

// // //                       <Select
// // //                         onValueChange={(value) =>
// // //                           handleCellSave(
// // //                             dayIndex,
// // //                             timeIndex,
// // //                             timetable[dayIndex]?.[timeIndex]?.teacher || "",
// // //                             value
// // //                           )
// // //                         }
// // //                         defaultValue={
// // //                           timetable[dayIndex]?.[timeIndex]?.subject || ""
// // //                         }
// // //                       >
// // //                         <SelectTrigger>
// // //                           <SelectValue placeholder="Select Subject" />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           {subjects.map((subject) => (
// // //                             <SelectItem key={subject} value={subject}>
// // //                               {subject}
// // //                             </SelectItem>
// // //                           ))}
// // //                         </SelectContent>
// // //                       </Select>

// // //                       <div className="flex gap-2">
// // //                         <Button
// // //                           size="sm"
// // //                           variant="outline"
// // //                           onClick={() => setEditingCell(null)}
// // //                         >
// // //                           <X className="h-4 w-4 text-black" />
// // //                         </Button>
// // //                       </div>
// // //                     </div>
// // //                   ) : (
// // //                     <div
// // //                       className="min-h-[80px] flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
// // //                       onClick={() => handleCellEdit(dayIndex, timeIndex)}
// // //                     >
// // //                       {timetable[dayIndex]?.[timeIndex] ? (
// // //                         <>
// // //                           <p className="font-medium">
// // //                             {timetable[dayIndex][timeIndex].teacher}
// // //                           </p>
// // //                           <p className="text-sm text-gray-500">
// // //                             {timetable[dayIndex][timeIndex].subject}
// // //                           </p>
// // //                         </>
// // //                       ) : (
// // //                         <p className="text-gray-400">No class</p>
// // //                       )}
// // //                     </div>
// // //                   )}
// // //                 </td>
// // //               ))}
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   );
// // // }
// // "use client";
// // import { useState, useEffect } from "react";
// // import { Edit2, Save, X } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { Input } from "@/components/ui/input";
// // import { useToast } from "@/hooks/use-toast";
// // import { TimetableCell } from "@/lib/types";

// // interface TimetableGridProps {
// //   course: string;
// //   semester: string;
// // }

// // interface TeacherWithSubjects {
// //   name: string;
// //   subjects: string[];
// // }

// // const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
// // const TIME_SLOTS = [
// //   "9:00-10:00",
// //   "10:00-11:00",
// //   "11:00-12:00",
// //   "12:00-1:00",
// //   "2:00-3:00",
// //   "3:00-4:00",
// // ];

// // export function TimetableGrid({ course, semester }: TimetableGridProps) {
// //   const { toast } = useToast();
// //   const [timetable, setTimetable] = useState<TimetableCell[][]>([]);
// //   const [editingCell, setEditingCell] = useState<{
// //     day: number;
// //     time: number;
// //   } | null>(null);
// //   const [teachers, setTeachers] = useState<TeacherWithSubjects[]>([]);
// //   const [selectedTeacher, setSelectedTeacher] = useState<string>("");
// //   const [selectedSubject, setSelectedSubject] = useState<string>("");

// //   useEffect(() => {
// //     fetchTimetableData();
// //     fetchTeachersAndSubjects();
// //   }, [course, semester]);

// //   const fetchTimetableData = async () => {
// //     try {
// //       const response = await fetch(
// //         `/api/timetable?course=${course}&semester=${semester}`
// //       );
// //       const data = await response.json();
// //       setTimetable(data.timetable || Array(5).fill(Array(6).fill(null)));
// //     } catch (error) {
// //       console.error("Error fetching timetable:", error);
// //     }
// //   };

// //   const fetchTeachersAndSubjects = async () => {
// //     try {
// //       const response = await fetch(
// //         `/api/teachers-subjects?course=${course}&semester=${semester}`
// //       );
// //       const data = await response.json();
// //       setTeachers(data.teachers || []);
// //     } catch (error) {
// //       console.error("Error fetching teachers and subjects:", error);
// //     }
// //   };

// //   const handleCellEdit = (day: number, time: number) => {
// //     setEditingCell({ day, time });
// //     const currentCell = timetable[day]?.[time];
// //     if (currentCell) {
// //       setSelectedTeacher(currentCell.teacher);
// //       setSelectedSubject(currentCell.subject);
// //     } else {
// //       setSelectedTeacher("");
// //       setSelectedSubject("");
// //     }
// //   };

// //   const handleTeacherChange = (teacherName: string) => {
// //     setSelectedTeacher(teacherName);
// //     setSelectedSubject(""); // Reset subject when teacher changes
// //   };

// //   const handleCellSave = async () => {
// //     if (!selectedTeacher || !selectedSubject) {
// //       toast({
// //         title: "Error",
// //         description: "Please select both teacher and subject",
// //         variant: "destructive",
// //       });
// //       return;
// //     }

// //     try {
// //       const response = await fetch("/api/timetable", {
// //         method: "PUT",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           course,
// //           semester,
// //           day: editingCell?.day,
// //           time: editingCell?.time,
// //           teacher: selectedTeacher,
// //           subject: selectedSubject,
// //         }),
// //       });

// //       if (!response.ok) {
// //         const error = await response.json();
// //         throw new Error(error.message);
// //       }

// //       // Update local state
// //       const newTimetable = [...timetable];
// //       if (!Array.isArray(newTimetable[editingCell!.day])) {
// //         newTimetable[editingCell!.day] = Array(6).fill(null);
// //       }
// //       newTimetable[editingCell!.day][editingCell!.time] = {
// //         teacher: selectedTeacher,
// //         subject: selectedSubject,
// //       };
// //       setTimetable(newTimetable);
// //       setEditingCell(null);
// //       setSelectedTeacher("");
// //       setSelectedSubject("");

// //       toast({
// //         title: "Success",
// //         description: "Timetable updated successfully",
// //       });
// //     } catch (error: any) {
// //       toast({
// //         title: "Error",
// //         description: error.message,
// //         variant: "destructive",
// //       });
// //     }
// //   };

// //   const getTeacherSubjects = (teacherName: string) => {
// //     const teacher = teachers.find(t => t.name === teacherName);
// //     return teacher?.subjects || [];
// //   };

// //   return (
// //     <div className="overflow-x-auto">
// //       <table className="w-full border-collapse">
// //         <thead>
// //           <tr>
// //             <th className="border p-2">Day/Time</th>
// //             {TIME_SLOTS.map((time) => (
// //               <th key={time} className="border p-2">
// //                 {time}
// //               </th>
// //             ))}
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {DAYS.map((day, dayIndex) => (
// //             <tr key={day}>
// //               <td className="border p-2 font-medium">{day}</td>
// //               {TIME_SLOTS.map((_, timeIndex) => (
// //                 <td key={`${day}-${timeIndex}`} className="border p-2">
// //                   {editingCell?.day === dayIndex &&
// //                   editingCell?.time === timeIndex ? (
// //                     <div className="space-y-2">
// //                       <Select
// //                         value={selectedTeacher}
// //                         onValueChange={handleTeacherChange}
// //                       >
// //                         <SelectTrigger>
// //                           <SelectValue placeholder="Select Teacher" />
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                           {teachers.map((teacher) => (
// //                             <SelectItem key={teacher.name} value={teacher.name}>
// //                               {teacher.name}
// //                             </SelectItem>
// //                           ))}
// //                         </SelectContent>
// //                       </Select>

// //                       {selectedTeacher && (
// //                         <Select
// //                           value={selectedSubject}
// //                           onValueChange={setSelectedSubject}
// //                         >
// //                           <SelectTrigger>
// //                             <SelectValue placeholder="Select Subject" />
// //                           </SelectTrigger>
// //                           <SelectContent>
// //                             {getTeacherSubjects(selectedTeacher).map((subject) => (
// //                               <SelectItem key={subject} value={subject}>
// //                                 {subject}
// //                               </SelectItem>
// //                             ))}
// //                           </SelectContent>
// //                         </Select>
// //                       )}

// //                       <div className="flex gap-2">
// //                         <Button
// //                           size="sm"
// //                           variant="outline"
// //                           onClick={() => setEditingCell(null)}
// //                         >
// //                           <X className="h-4 w-4" />
// //                         </Button>
// //                         <Button
// //                           size="sm"
// //                           onClick={handleCellSave}
// //                           disabled={!selectedTeacher || !selectedSubject}
// //                         >
// //                           <Save className="h-4 w-4" />
// //                         </Button>
// //                       </div>
// //                     </div>
// //                   ) : (
// //                     <div
// //                       className="min-h-[80px] flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
// //                       onClick={() => handleCellEdit(dayIndex, timeIndex)}
// //                     >
// //                       {timetable[dayIndex]?.[timeIndex] ? (
// //                         <>
// //                           <p className="font-medium">
// //                             {timetable[dayIndex][timeIndex].teacher}
// //                           </p>
// //                           <p className="text-sm text-gray-500">
// //                             {timetable[dayIndex][timeIndex].subject}
// //                           </p>
// //                         </>
// //                       ) : (
// //                         <p className="text-gray-400">No class</p>
// //                       )}
// //                     </div>
// //                   )}
// //                 </td>
// //               ))}
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }
// // // "use client";
// // // import { useState, useEffect } from "react";
// // // import { Edit2, Save, X } from "lucide-react";
// // // import { Button } from "@/components/ui/button";
// // // import {
// // //   Select,
// // //   SelectContent,
// // //   SelectItem,
// // //   SelectTrigger,
// // //   SelectValue,
// // // } from "@/components/ui/select";
// // // import { Input } from "@/components/ui/input";
// // // import { useToast } from "@/hooks/use-toast";
// // // import { TimetableCell } from "@/lib/types";
// // // import { deleteSlot } from "@/actions/action.data";
// // // interface TimetableGridProps {
// // //   course: string;
// // //   semester: string;
// // // }

// // // interface TeacherWithSubjects {
// // //   name: string;
// // //   subjects: string[];
// // // }

// // // const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
// // // const TIME_SLOTS = [
// // //   "9:00-10:00",
// // //   "10:00-11:00",
// // //   "11:00-12:00",
// // //   "12:00-1:00",
// // //   "2:00-3:00",
// // //   "3:00-4:00",
// // // ];

// // // export function TimetableGrid({ course, semester }: TimetableGridProps) {
// // //   const { toast } = useToast();
// // //   const [timetable, setTimetable] = useState<TimetableCell[][]>([]);
// // //   const [editingCell, setEditingCell] = useState<{
// // //     day: number;
// // //     time: number;
// // //   } | null>(null);
// // //   const [teachers, setTeachers] = useState<TeacherWithSubjects[]>([]);
// // //   const [selectedTeacher, setSelectedTeacher] = useState<string>("");
// // //   const [selectedSubject, setSelectedSubject] = useState<string>("");
// // //   const [eventIdToDelete, setEventIdToDelete] = useState<string | null>(null);
// // //   useEffect(() => {
// // //     fetchTimetableData();
// // //     fetchTeachersAndSubjects();
// // //   }, [course, semester]);

// // //   const fetchTimetableData = async () => {
// // //     try {
// // //       const response = await fetch(
// // //         `/api/timetable?course=${course}&semester=${semester}`
// // //       );
// // //       const data = await response.json();
// // //       setTimetable(data.timetable || Array(5).fill(Array(6).fill(null)));
// // //     } catch (error) {
// // //       console.error("Error fetching timetable:", error);
// // //     }
// // //   };

// // //   const fetchTeachersAndSubjects = async () => {
// // //     try {
// // //       const response = await fetch(
// // //         `/api/teachers-subjects?course=${course}&semester=${semester}`
// // //       );
// // //       const data = await response.json();
// // //       setTeachers(data.teachers || []);
// // //     } catch (error) {
// // //       console.error("Error fetching teachers and subjects:", error);
// // //     }
// // //   };

// // //   const handleCellEdit = (day: number, time: number) => {
// // //     setEditingCell({ day, time });
// // //     const currentCell = timetable[day]?.[time];
// // //     if (currentCell) {
// // //       setSelectedTeacher(currentCell.teacher);
// // //       setSelectedSubject(currentCell.subject);
// // //     } else {
// // //       setSelectedTeacher("");
// // //       setSelectedSubject("");
// // //     }
// // //   };

// // //   const handleTeacherChange = (teacherName: string) => {
// // //     setSelectedTeacher(teacherName);
// // //     setSelectedSubject(""); // Reset subject when teacher changes
// // //   };

// // //   const handleCellSave = async () => {
// // //     if (!selectedTeacher || !selectedSubject) {
// // //       toast({
// // //         title: "Error",
// // //         description: "Please select both teacher and subject",
// // //         variant: "destructive",
// // //       });
// // //       return;
// // //     }

// // //     try {
// // //       const response = await fetch("/api/timetable", {
// // //         method: "PUT",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify({
// // //           course,
// // //           semester,
// // //           day: editingCell?.day,
// // //           time: editingCell?.time,
// // //           teacher: selectedTeacher,
// // //           subject: selectedSubject,
// // //         }),
// // //       });

// // //       if (!response.ok) {
// // //         const error = await response.json();
// // //         throw new Error(error.message);
// // //       }

// // //       // Update local state
// // //       const newTimetable = [...timetable];
// // //       if (!Array.isArray(newTimetable[editingCell!.day])) {
// // //         newTimetable[editingCell!.day] = Array(6).fill(null);
// // //       }
// // //       newTimetable[editingCell!.day][editingCell!.time] = {
// // //         teacher: selectedTeacher,
// // //         subject: selectedSubject,
// // //       };
// // //       setTimetable(newTimetable);
// // //       setEditingCell(null);
// // //       setSelectedTeacher("");
// // //       setSelectedSubject("");

// // //       toast({
// // //         title: "Success",
// // //         description: "Timetable updated successfully",
// // //       });
// // //     } catch (error: any) {
// // //       toast({
// // //         title: "Error",
// // //         description: error.message,
// // //         variant: "destructive",
// // //       });
// // //     }
// // //   };

// // //   const getTeacherSubjects = (teacherName: string) => {
// // //     const teacher = teachers.find(t => t.name === teacherName);
// // //     return teacher?.subjects || [];
// // //   };
// // //   const handleDeleteClick = (eventId: string) => {
// // //     setEventIdToDelete(eventId);;
// // //   };
// // //   const handleDeleteConfirm = async () => {
// // //     if (!eventIdToDelete) return;

// // //       try {
// // //         await deleteSlot(eventIdToDelete);
// // //         alert("Event deleted successfully!");
// // //       } catch (error) {
// // //         console.error("Error deleting event:", error);
// // //         alert("Failed to delete event");
// // //       } finally {
// // //         setEventIdToDelete(null);
// // //       }
// // //   };
// // //   return (
// // //     <div className="overflow-x-auto">
// // //       <table className="w-full border-collapse">
// // //         <thead>
// // //           <tr>
// // //             <th className="border p-2">Day/Time</th>
// // //             {TIME_SLOTS.map((time) => (
// // //               <th key={time} className="border p-2">
// // //                 {time}
// // //               </th>
// // //             ))}
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {DAYS.map((day, dayIndex) => (
// // //             <tr key={day}>
// // //               <td className="border p-2 font-medium">{day}</td>
// // //               {TIME_SLOTS.map((_, timeIndex) => (
// // //                 <td key={`${day}-${timeIndex}`} className="border p-2">
// // //                   {editingCell?.day === dayIndex &&
// // //                   editingCell?.time === timeIndex ? (
// // //                     <div className="space-y-2">
// // //                       <Select
// // //                         value={selectedTeacher}
// // //                         onValueChange={handleTeacherChange}
// // //                       >
// // //                         <SelectTrigger>
// // //                           <SelectValue placeholder="Select Teacher" />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           {teachers.map((teacher) => (
// // //                             <SelectItem key={teacher.name} value={teacher.name}>
// // //                               {teacher.name}
// // //                             </SelectItem>
// // //                           ))}
// // //                         </SelectContent>
// // //                       </Select>

// // //                       {selectedTeacher && (
// // //                         <Select
// // //                           value={selectedSubject}
// // //                           onValueChange={setSelectedSubject}
// // //                         >
// // //                           <SelectTrigger>
// // //                             <SelectValue placeholder="Select Subject" />
// // //                           </SelectTrigger>
// // //                           <SelectContent>
// // //                             {getTeacherSubjects(selectedTeacher).map((subject) => (
// // //                               <SelectItem key={subject} value={subject}>
// // //                                 {subject}
// // //                               </SelectItem>
// // //                             ))}
// // //                           </SelectContent>
// // //                         </Select>
// // //                       )}

// // //                       <div className="flex gap-2">
// // //                         <Button
// // //                           size="sm"
// // //                           variant="outline"
// // //                           onClick={() => setEditingCell(null)}
// // //                         >
// // //                           <X className="h-4 w-4" />
// // //                         </Button>
// // //                         <Button
// // //                           size="sm"
// // //                           onClick={handleCellSave}
// // //                           disabled={!selectedTeacher || !selectedSubject}
// // //                         >
// // //                           <Save className="h-4 w-4" />
// // //                         </Button>
// // //                       </div>
// // //                     </div>
// // //                   ) : (
// // //                     <div
// // //                       className="min-h-[80px] flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
// // //                       onClick={() => handleCellEdit(dayIndex, timeIndex)}
// // //                     >
// // //                       {timetable[dayIndex]?.[timeIndex] ? (
// // //                         <>
// // //                           <p className="font-medium">
// // //                             {timetable[dayIndex][timeIndex].teacher}
// // //                           </p>
// // //                           <p className="text-sm text-gray-500">
// // //                             {timetable[dayIndex][timeIndex].subject}
// // //                           </p>
// // //                         </>
// // //                       ) : (
// // //                         <p className="text-gray-400">No class</p>
// // //                       )}
// // //                     </div>
// // //                   )}
// // //                 </td>
// // //               ))}
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   );
// // // }

// // {/* <button
// // className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition duration-200"
// // onClick={() => handleDeleteClick(event.id)}
// // disabled={isPending}
// // >
// // {isPending ? "Deleting..." : "Delete"}
// // </button> */}
// "use client";

// import { useState, useEffect } from "react";
// import { Edit2, Save, X, Trash2 } from "lucide-react";
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
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";

// interface TimetableGridProps {
//   course: string;
//   semester: string;
// }

// interface TeacherWithSubjects {
//   name: string;
//   subjects: string[];
// }

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
//   const [teachers, setTeachers] = useState<TeacherWithSubjects[]>([]);
//   const [selectedTeacher, setSelectedTeacher] = useState<string>("");
//   const [selectedSubject, setSelectedSubject] = useState<string>("");

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
//       setTimetable(data.timetable || Array(5).fill(Array(6).fill(null)));
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
//       setTeachers(data.teachers || []);
//     } catch (error) {
//       console.error("Error fetching teachers and subjects:", error);
//     }
//   };

//   const handleCellEdit = (day: number, time: number) => {
//     setEditingCell({ day, time });
//     const currentCell = timetable[day]?.[time];
//     if (currentCell) {
//       setSelectedTeacher(currentCell.teacher);
//       setSelectedSubject(currentCell.subject);
//     } else {
//       setSelectedTeacher("");
//       setSelectedSubject("");
//     }
//   };

//   const handleTeacherChange = (teacherName: string) => {
//     setSelectedTeacher(teacherName);
//     setSelectedSubject("");
//   };

//   const handleDeleteSlot = async (day: number, time: number) => {
//     try {
//       const response = await fetch("/api/timetable", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           course,
//           semester,
//           day,
//           time,
//         }),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message);
//       }

//       // Update local state
//       const newTimetable = [...timetable];
//       if (!Array.isArray(newTimetable[day])) {
//         newTimetable[day] = Array(6).fill(null);
//       }
//       newTimetable[day][time] = null;
//       setTimetable(newTimetable);

//       toast({
//         title: "Success",
//         description: "Slot deleted successfully",
//       });
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     }
//   };

//   const handleCellSave = async () => {
//     if (!selectedTeacher || !selectedSubject) {
//       toast({
//         title: "Error",
//         description: "Please select both teacher and subject",
//         variant: "destructive",
//       });
//       return;
//     }

//     try {
//       const response = await fetch("/api/timetable", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           course,
//           semester,
//           day: editingCell?.day,
//           time: editingCell?.time,
//           teacher: selectedTeacher,
//           subject: selectedSubject,
//         }),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message);
//       }

//       // Update local state
//       const newTimetable = [...timetable];
//       if (!Array.isArray(newTimetable[editingCell!.day])) {
//         newTimetable[editingCell!.day] = Array(6).fill(null);
//       }
//       newTimetable[editingCell!.day][editingCell!.time] = {
//         teacher: selectedTeacher,
//         subject: selectedSubject,
//       };
//       setTimetable(newTimetable);
//       setEditingCell(null);
//       setSelectedTeacher("");
//       setSelectedSubject("");

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

//   const getTeacherSubjects = (teacherName: string) => {
//     const teacher = teachers.find((t) => t.name === teacherName);
//     return teacher?.subjects || [];
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
//                         value={selectedTeacher}
//                         onValueChange={handleTeacherChange}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select Teacher" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {teachers.map((teacher) => (
//                             <SelectItem key={teacher.name} value={teacher.name}>
//                               {teacher.name}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>

//                       {selectedTeacher && (
//                         <Select
//                           value={selectedSubject}
//                           onValueChange={setSelectedSubject}
//                         >
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select Subject" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {getTeacherSubjects(selectedTeacher).map((subject) => (
//                               <SelectItem key={subject} value={subject}>
//                                 {subject}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       )}

//                       <div className="flex gap-2">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => setEditingCell(null)}
//                         >
//                           <X className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           size="sm"
//                           onClick={handleCellSave}
//                           disabled={!selectedTeacher || !selectedSubject}
//                         >
//                           <Save className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="min-h-[80px] relative">
//                       <div
//                         className="h-full flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
//                         onClick={() => handleCellEdit(dayIndex, timeIndex)}
//                       >
//                         {timetable[dayIndex]?.[timeIndex] ? (
//                           <>
//                             <p className="font-medium">
//                               {timetable[dayIndex][timeIndex].teacher}
//                             </p>
//                             <p className="text-sm text-gray-500">
//                               {timetable[dayIndex][timeIndex].subject}
//                             </p>
//                           </>
//                         ) : (
//                           <p className="text-gray-400">No class</p>
//                         )}
//                       </div>
//                       {timetable[dayIndex]?.[timeIndex] && (
//                         <AlertDialog>
//                           <AlertDialogTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="absolute top-1 right-1 h-6 w-6"
//                               onClick={(e) => e.stopPropagation()}
//                             >
//                               <Trash2 className="h-4 w-4 text-destructive" />
//                             </Button>
//                           </AlertDialogTrigger>
//                           <AlertDialogContent>
//                             <AlertDialogHeader>
//                               <AlertDialogTitle>Delete Slot</AlertDialogTitle>
//                               <AlertDialogDescription>
//                                 Are you sure you want to delete this slot? This
//                                 action cannot be undone.
//                               </AlertDialogDescription>
//                             </AlertDialogHeader>
//                             <AlertDialogFooter>
//                               <AlertDialogCancel>Cancel</AlertDialogCancel>
//                               <AlertDialogAction
//                                 onClick={() =>
//                                   handleDeleteSlot(dayIndex, timeIndex)
//                                 }
//                               >
//                                 Delete
//                               </AlertDialogAction>
//                             </AlertDialogFooter>
//                           </AlertDialogContent>
//                         </AlertDialog>
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
import { useToast } from "@/hooks/use-toast";
import {
  TimetableCell,
  TeacherWithSubjects,
  TimeSlot,
  DAYS,
} from "@/lib/types";
import { TimetableSlot } from "@/components/timetable-slot";
import { TimeSlotEditor } from "@/components/time-slot-editor";
import { AddTimeSlot } from "../add-time-slote";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TimetableGridProps {
  course: string;
  semester: string;
}

export function TimetableGrid({ course, semester }: TimetableGridProps) {
  const { toast } = useToast();
  const [timetable, setTimetable] = useState<(TimetableCell | null)[][]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
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

  const handleCellEdit = (day: number, time: number) => {
    setEditingCell({ day, time });
    const currentCell = timetable[day]?.[time];
    if (currentCell) {
      setSelectedTeacher(currentCell.teacher || "");
      setSelectedSubject(currentCell.subject || "");
    } else {
      setSelectedTeacher("");
      setSelectedSubject("");
    }
  };

  const handleTeacherChange = (teacherName: string) => {
    setSelectedTeacher(teacherName);
    setSelectedSubject(""); // Reset subject when teacher changes
  };

  const handleDeleteSlot = async (day: number, time: number) => {
    try {
      const response = await fetch("/api/timetable", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course,
          semester,
          day,
          time,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      // Update local state
      const newTimetable = [...timetable];
      if (!Array.isArray(newTimetable[day])) {
        newTimetable[day] = Array(timeSlots.length).fill(null);
      }
      newTimetable[day][time] = null;
      setTimetable(newTimetable);

      toast({
        title: "Success",
        description: "Slot deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
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
        newTimetable[editingCell!.day] = Array(timeSlots.length).fill(null);
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

  const handleTimeSlotSave = async (
    index: number,
    start: string,
    end: string
  ) => {
    try {
      const response = await fetch("/api/time", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course,
          semester,
          index,
          start,
          end,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update time slot");
      }

      const data = await response.json();
      setTimeSlots(data.slots);
      toast({
        title: "Success",
        description: "Time slot updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleAddTimeSlot = async (start: string, end: string) => {
    try {
      const response = await fetch("/api/time", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course,
          semester,
          start,
          end,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add time slot");
      }

      const data = await response.json();
      setTimeSlots(data.slots);
      // Expand timetable array to accommodate new time slot
      setTimetable((prev) => prev.map((row) => [...row, null]));
      toast({
        title: "Success",
        description: "Time slot added successfully",
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
    const teacher = teachers.find((t) => t.name === teacherName);
    return teacher?.subjects || [];
  };
  const handleDeleteTimeSlot = async (index: number) => {
    try {
      const response = await fetch("/api/time", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course,
          semester,
          index,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete time slot");
      }

      // Update the timeSlots state by removing the specified slot
      const newTimeSlots = timeSlots.filter((_, i) => i !== index);
      setTimeSlots(newTimeSlots);

      // Update the timetable state by removing the column for the deleted slot
      const newTimetable = timetable.map((row) =>
        row.filter((_, i) => i !== index)
      );
      setTimetable(newTimetable);

      toast({
        title: "Success",
        description: "Time slot deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AddTimeSlot onAdd={handleAddTimeSlot} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Day/Time</th>
              {timeSlots.map((slot, index) => (
                <th key={index} className="border p-2">
                  <TimeSlotEditor
                    timeSlot={slot}
                    index={index}
                    onSave={handleTimeSlotSave}
                    onDelete={handleDeleteTimeSlot}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DAYS.map((day, dayIndex) => (
              <tr key={day}>
                <td className="border p-2 font-medium">{day}</td>
                {timeSlots.map((_, timeIndex) => (
                  <td key={`${day}-${timeIndex}`} className="border p-2">
                    <TimetableSlot
                      cell={timetable[dayIndex]?.[timeIndex]}
                      isEditing={
                        editingCell?.day === dayIndex &&
                        editingCell?.time === timeIndex
                      }
                      onEdit={() => handleCellEdit(dayIndex, timeIndex)}
                      onDelete={() => handleDeleteSlot(dayIndex, timeIndex)}
                      onSave={handleCellSave}
                      onCancel={() => setEditingCell(null)}
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
