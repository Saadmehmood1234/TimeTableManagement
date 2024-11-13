// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { TimetableGrid } from "@/components/timetable/TimeTableGrid";
// import { TeacherStats } from "@/components/timetable/TeacherStats";
// import { TeacherSubjectForm } from "@/components/timetable/TeacherSubjectForm";

// export default function TimetablePage() {
//   const [selectedCourse, setSelectedCourse] = useState<string>("");
//   const [selectedSemester, setSelectedSemester] = useState<string>("");

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 text-black dark:to-gray-800 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <h1 className="text-3xl font-bold">Timetable Management</h1>
//           <div className="flex gap-4">
//             <Select value={selectedCourse} onValueChange={setSelectedCourse}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Select Course" />
//               </SelectTrigger>
//               <SelectContent >
//                 <SelectItem value="btech" >B.Tech</SelectItem>
//                 <SelectItem value="mtech" >M.Tech</SelectItem>
//                 <SelectItem value="bca" >BCA</SelectItem>
//                 <SelectItem value="mca" >MCA</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select value={selectedSemester} onValueChange={setSelectedSemester}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Select Semester" />
//               </SelectTrigger>
//               <SelectContent>
//                 {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
//                   <SelectItem key={sem} value={sem.toString()}>
//                     Semester {sem}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {selectedCourse && selectedSemester && (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-2">
//               <Card className="p-6">
//                 <TimetableGrid
//                   course={selectedCourse}
//                   semester={selectedSemester}
//                 />
//               </Card>
//             </div>
//             <div className="space-y-6">
//               <Card className="p-6">
//                 <TeacherSubjectForm
//                   course={selectedCourse}
//                   semester={selectedSemester}
//                 />
//               </Card>
//               <Card className="p-6">
//                 <TeacherStats />
//               </Card>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

export default function TimetablePage() {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");

  // Set default values on component mount
  useEffect(() => {
    setSelectedCourse("bca");
    setSelectedSemester("5"); // Default to Semester 1 for BCA
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 text-black dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Timetable Management</h1>
          <div className="flex w-full max-sm:flex-col gap-4">
            <Select value={selectedCourse}  onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-[180px] max-sm:w-full">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="btech">B.Tech</SelectItem>
                <SelectItem value="mtech">M.Tech</SelectItem>
                <SelectItem value="bca">BCA</SelectItem>
                <SelectItem value="mca">MCA</SelectItem>
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
          </div>
        </div>

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
