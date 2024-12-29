// "use client";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { Eye } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { AllCourse } from "@/components/AllCourses";
// import TeacherTable from "./TeacherTable";
// import { span } from "framer-motion/client";

// export default function TeacherDetails() {
//   const [selectedTeacher, setSelectedTeacher] = useState<string>("All"); // Default set to "All"
//   const [viewAllTeacher, setViewAllTeacher] = useState(false);
//   const [teacher, setTeacher] = useState([]);

//   const getData = async () => {
//     try {
//       const response = await fetch("/api/get-teacher");
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const teacherData = await response.json();
//       console.log("All Teacher:", teacherData.data);
//       setTeacher(teacherData.data);
//     } catch (error) {
//       console.error("Error fetching course data:", error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 text-black dark:to-gray-800 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <h1 className="text-3xl font-bold">Teacher Detail</h1>
//           <div className="flex w-full max-sm:flex-col gap-4">
//             <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
//               <SelectTrigger className="w-[180px] max-sm:w-full">
//                 <SelectValue placeholder="Select Teacher" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="All">All</SelectItem>
//                 {teacher.map((c: any, index: number) => (
//                   <SelectItem key={index} value={c.name}>
//                     {c.name}
//                   </SelectItem> // Use a unique field for value
//                 ))}
//               </SelectContent>
//             </Select>
//             <div className="gap-4 flex justify-center text-white items-center border-gray-300">
//               <Button onClick={() => setViewAllTeacher(!viewAllTeacher)}>
//                 All Teachers
//               </Button>
//             </div>
//           </div>
//         </div>
//         <div>{viewAllTeacher && <AllCourse />}</div>
//         {selectedTeacher !== "All" && (
//           <div className="flex flex-col gap-2">
//             <div className="lg:col-span-2">
//               <Card className="p-6">
//                 <TeacherTable
//                   selectedTeacher={selectedTeacher}
//                   teacher={teacher}
//                 />
//               </Card>
//             </div>
//           </div>
//         )}
//       </div>
//       <div className="max-w-7xl mx-auto space-y-6">
//         {selectedTeacher === "All" ? (
//           <table className="w-full border-collapse">
//             <thead>
//               <tr>
//                 <th className="border p-2">Teacher</th>
//                 <th className="border p-2">Subject</th>
//                 <th className="border p-2">Detail</th>
//               </tr>
//             </thead>
//             <tbody>
//               {teacher.map((tdata: any, index: number) => (
//                 <tr key={index} className="">
//                   <td className="border px-4 py-2">{tdata.name}</td>
//                   <td className="border px-4 py-2">
//                     <ul className="pl-4 grid grid-cols-4">
//                       {tdata.subjects.map((t: any, i: number) => (
//                         <li key={i}>{t}</li> // Display subjects as a list
//                       ))}
//                     </ul>
//                   </td>
//                   <td className="border px-4 py-2 ">
//                     <Eye />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <div></div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Eye } from "lucide-react";
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
  const [selectedTeacher, setSelectedTeacher] = useState<string>("All"); // Default set to "All"
  const [viewAllTeacher, setViewAllTeacher] = useState(false);
  const [teacher, setTeacher] = useState<any[]>([]); // State for teacher data
  const [timetable, setTimetable] = useState<any | null>(null); // State to store timetable of selected teacher

  // Function to fetch teacher data
  const getData = async () => {
    try {
      const response = await fetch("/api/get-teacher");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const teacherData = await response.json();
      setTeacher(teacherData.data);
    } catch (error) {
      console.error("Error fetching teacher data:", error);
    }
  };

  // Function to fetch or set dummy timetable data for selected teacher
  const getTeacherTimetable = (teacherName: string) => {
    if (teacherName !== "All") {
      // Dummy timetable data
      const dummyTimetable = [
        { day: "Monday", subject: "Math", time: "9:00 AM - 11:00 AM", course: "BCA", semester: "1" },
        { day: "Tuesday", subject: "Physics", time: "10:00 AM - 12:00 PM", course: "BCA", semester: "1" },
        { day: "Wednesday", subject: "Chemistry", time: "11:00 AM - 1:00 PM", course: "BCA", semester: "1" },
        { day: "Thursday", subject: "English", time: "2:00 PM - 4:00 PM", course: "BCA", semester: "2" },
        { day: "Friday", subject: "Computer Science", time: "1:00 PM - 3:00 PM", course: "BCA", semester: "2" },
      ];
      setTimetable(dummyTimetable); // Set the dummy data for the timetable
    } else {
      setTimetable(null); // Reset timetable when "All" is selected
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (selectedTeacher !== "All") {
      getTeacherTimetable(selectedTeacher); // Fetch or set timetable when a teacher is selected
    } else {
      setTimetable(null); // Reset timetable when "All" is selected
    }
  }, [selectedTeacher]);

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
                  </SelectItem>
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

        {selectedTeacher !== "All" && timetable && (
          <div className="flex flex-col gap-2">
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold">Timetable for {selectedTeacher}</h2>
                <div className="mt-4">
                  <table className="w-full border-collapse">
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
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Show all teachers when "All" is selected */}
      {selectedTeacher === "All" && (
        <div className="max-w-7xl mx-auto space-y-6">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Teacher</th>
                <th className="border p-2">Subject</th>
                <th className="border p-2">Detail</th>
              </tr>
            </thead>
            <tbody>
              {teacher.map((tdata: any, index: number) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{tdata.name}</td>
                  <td className="border px-4 py-2">
                    <ul className="pl-4 grid grid-cols-4">
                      {tdata.subjects.map((subject: string, i: number) => (
                        <li key={i}>{subject}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border px-4 py-2">
                    <Eye />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
