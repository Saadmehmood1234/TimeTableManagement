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
      <h1 className="text-3xl font-bold text-center text-black pb-4">
        {course.charAt(0).toUpperCase() + course.slice(1).toLowerCase()} -{" "}
        {semester} Timetable
      </h1>
      <div className="p-5 flex flex-col w-full gap-2 z-20">
  {/* Header Row */}
  <div className="flex gap-2 justify-center items-center">
    <div className="bg-[#AFCDE9] border-2 border-black flex justify-center items-center w-[140px] h-[70px] shadow-md cursor-pointer">
      <h2 className="font-semibold drop-shadow-md text-xl">Time</h2>
    </div>
    {DAYS.map((day) => (
      <div
        key={day}
        className="bg-[#FFA5BA] border-2 border-black flex justify-center items-center w-[180px] h-[70px] shadow-md cursor-pointer"
      >
        <h2 className="font-semibold drop-shadow-md text-xl">{day}</h2>
      </div>
    ))}
  </div>

  {/* Timetable Rows */}
  {timeSlots.map((slot, timeIndex) => (
    <div
      className="flex gap-2 justify-center items-center"
      key={timeIndex}
    >
      <div className="bg-[#AFCDE9] border-2 border-black flex justify-center rounded items-center w-[140px] h-[70px] shadow-md cursor-pointer">
        <h2 className="font-semibold drop-shadow-md text-lg">
          {slot.start} - {slot.end}
        </h2>
      </div>
      {DAYS.map((day, dayIndex) => (
        <div
          key={`${day}-${timeIndex}`}
          className="bg-transparent border-2 border-[#333333] flex justify-center items-center w-[180px] h-[70px] shadow-md cursor-pointer px-2"
        >
          <div className="flex flex-col text-center justify-center items-center w-full h-full overflow-hidden">
            {timetable[dayIndex]?.[timeIndex] ? (
              <div className="flex flex-col">
                <span className="text-[14px] mt-2 font-bold capitalize">
                  {timetable[dayIndex][timeIndex]?.subject}
                </span>
                <span className="text-[12px] mb-2 font-medium capitalize">
                  {timetable[dayIndex][timeIndex]?.teacher}
                </span>
              </div>
            ) : (
              <p className="text-[15px] font-medium capitalize">No Class</p>
            )}
          </div>
        </div>
      ))}
    </div>
  ))}
</div>

    </div>
  );
}

// "use client";
// import { FileDown } from "lucide-react";
// import { useRef } from "react";
// import html2pdf from "html2pdf.js";
// const TimeTableContainer = () => {
//   const timeTableRef = useRef(null);

//   const downloadPDF = () => {
//     const element = timeTableRef.current;
//     if (!element) return;

//     const options = {
//       margin: [10, 10, 10, 10], // Set margin if needed
//       filename: "timetable.pdf",
//       image: { type: "png", quality: 1 },
//       html2canvas: { scale: 2 }, // Increase scale for better quality
//       jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
//     };

//     // Use html2pdf to convert HTML content to PDF
//     html2pdf()
//       .from(element) // Convert the content from the ref
//       .set(options) // Apply settings
//       .save(); // Download the PDF
//   };

//   return (
//     <div>
//       <div ref={timeTableRef} className="bg-[#F7E3EC]">
//         <div className="w-full flex justify-center gap-10 items-center z-20">
//           <h1 className="text-3xl font-semibold drop-shadow-md animeFont">
//           Weekly TimeTable
//           </h1>
//           <button
//             className="w-[160px] h-[40px] flex justify-center items-center gap-2 font-semibold bg-[#031b4e] text-white rounded-md cursor-pointer"
//             onClick={downloadPDF}
//           >
//             {" "}
//             <FileDown /> <p>Download</p>
//           </button>
//         </div>

//         <div className=" p-5 flex flex-col w-full  gap-2 z-20">
//           <div className="flex gap-2 justify-center items-center">
//             <div className="bg-[#AFCDE9] border-2 border-black flex justify-center items-center w-[140px] h-[70px] shadow-md cursor-pointer">
//               <h2 className="font-semibold drop-shadow-md text-xl">Time</h2>
//             </div>
//             <div className="bg-[#FFA5BA] border-2 border-black flex justify-center items-center  w-[140px] h-[70px] shadow-md cursor-pointer">
//               <h2 className="font-semibold drop-shadow-md text-2xl">Monday</h2>
//             </div>
//             <div className="bg-[#FFA5BA] border-2 border-black flex justify-center items-center  w-[140px] h-[70px] shadow-md cursor-pointer">
//               <h2 className="font-semibold drop-shadow-md text-2xl">Tuesday</h2>
//             </div>
//             <div className="bg-[#FFA5BA] border-2 border-black flex justify-center items-center  w-[140px] h-[70px] shadow-md cursor-pointer">
//               <h2 className="font-semibold drop-shadow-md text-2xl">
//                 Wednesday
//               </h2>
//             </div>
//             <div className="bg-[#FFA5BA] border-2 border-black flex justify-center items-center  w-[140px] h-[70px] shadow-md cursor-pointer">
//               <h2 className="font-semibold drop-shadow-md text-2xl">
//                 ThursDay
//               </h2>
//             </div>
//             <div className="bg-[#FFA5BA] border-2 border-black flex justify-center items-center  w-[140px] h-[70px] shadow-md cursor-pointer ">
//               <h2 className="font-semibold drop-shadow-md text-2xl">Tuesday</h2>
//             </div>
//           </div>

//           {new Array(6).fill(1).map((_, index) => (
//             <div className="flex gap-2 justify-center items-center" key={index}>
//               <div className="bg-[#AFCDE9]  border-2 border-black flex justify-center rounded items-center w-[140px] h-[70px] shadow-md cursor-pointer">
//                 <h2 className="font-semibold drop-shadow-md text-xl">
//                   7:00-8:30
//                 </h2>
//               </div>
//               <div className="bg-transparent border-2 border-[#333333] flex justify-center items-center w-[140px] h-[70px] shadow-md cursor-pointer px-2">
//                 <div className="flex flex-col justify-center items-center w-full h-full overflow-hidden">
//                   <p className="text-[15px] font-semibold truncate w-full overflow-hidden whitespace-nowrap">
//                     Operating Systemhfhfghfhfgh
//                   </p>
//                   <p className="text-[10px] font-medium capitalize">
//                     Amandeep Singh
//                   </p>
//                   <p className="text-[10px] font-medium capitalize">
//                     Amandeep Singh
//                   </p>
//                 </div>
//               </div>
//               <div className="bg-transparent border-2 border-[#333333] flex justify-center items-center w-[140px] h-[70px] shadow-md cursor-pointer px-2">
//                 <div className="flex flex-col justify-center items-center w-full h-full overflow-hidden">
//                   <p className="text-[15px] font-semibold truncate w-full overflow-hidden whitespace-nowrap">
//                     Operating Systemhfhfghfhfgh
//                   </p>
//                   <p className="text-[10px] font-medium capitalize">
//                     Amandeep Singh
//                   </p>
//                   <p className="text-[10px] font-medium capitalize">
//                     Amandeep Singh
//                   </p>
//                 </div>
//               </div>
//               <div className="bg-transparent border-2 border-[#333333] flex justify-center items-center w-[140px] h-[70px] shadow-md cursor-pointer px-2">
//                 <div className="flex flex-col justify-center items-center w-full h-full overflow-hidden">
//                   <p className="text-[15px] font-semibold truncate w-full overflow-hidden whitespace-nowrap">
//                     Operating Systemhfhfghfhfgh
//                   </p>
//                   <p className="text-[10px] font-medium capitalize">
//                     Amandeep Singh
//                   </p>
//                   <p className="text-[10px] font-medium capitalize">
//                     Amandeep Singh
//                   </p>
//                 </div>
//               </div>
//               <div className="bg-transparent border-2 border-[#333333] flex justify-center items-center w-[140px] h-[70px] shadow-md cursor-pointer px-2">
//                 <div className="flex flex-col justify-center items-center w-full h-full overflow-hidden">
//                   <p className="text-[15px] font-semibold truncate w-full overflow-hidden whitespace-nowrap">
//                     Operating Systemhfhfghfhfgh
//                   </p>
//                   <p className="text-[10px] font-medium capitalize">
//                     Amandeep Singh
//                   </p>
//                   <p className="text-[10px] font-medium capitalize">
//                     Amandeep Singh
//                   </p>
//                 </div>
//               </div>{" "}
//               <div className="bg-transparent border-2 border-[#333333] flex justify-center items-center w-[140px] h-[70px] shadow-md cursor-pointer px-2">
//                 <div className="flex flex-col justify-center items-center w-full h-full overflow-hidden">
//                   <p className="text-[15px] font-semibold truncate w-full overflow-hidden whitespace-nowrap">
//                     Operating Systemhfhfghfhfgh
//                   </p>
//                   <p className="text-[10px] font-medium capitalize">
//                     Amandeep Singh
//                   </p>
//                   <p className="text-[10px] font-medium capitalize">
//                     Amandeep Singh
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimeTableContainer;
