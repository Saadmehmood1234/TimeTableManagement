"use client";
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import Download from "@/components/Download";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimetableGrid } from "@/components/timetable/TimeTableGrid";
import { AddCourse } from "@/components/AddCourse";
 import TeacherCard from "@/components/home/TeacherCard";
import { TimeTableContainer } from "@/components/home/TimeTableContainer";
export default function HomePage() {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [viewCourse, setViewCourse] = useState(false);
  const [course, setCourse] = useState([]);

  const timeTableRef =useRef<HTMLDivElement |null >(null);
  // Set default values on component mount
  useEffect(() => {
    setSelectedCourse("bca");
    setSelectedSemester("5");
  }, []);

  const getData = async () => {
    try {
      const response = await fetch("/api/get-course");
      if (response.ok) {
  
      const courseData = await response.json();
      console.log(courseData);
      console.log(courseData.data[0].course);
      setCourse(courseData.data);
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };
  console.log(course);
  useEffect(() => {
    getData();
  }, []);


  
  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto space-y-6">
       <div className="flex justify-between">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Timetable</h1>
          <div className="flex w-full max-sm:flex-col gap-4" >
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-[180px] max-sm:w-full bg-white text-black">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bca">BCA</SelectItem>
                {course.map((c: any, index: any) => {
                  return (
                    <SelectItem key={index} value={c.course}>
                      {c.course}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Select
              value={selectedSemester}
              onValueChange={setSelectedSemester}
            >
              <SelectTrigger className="w-[180px] max-sm:w-full bg-white text-black">
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
        <Download timeTableRef={timeTableRef}/>
       </div>
       
        {selectedCourse && selectedSemester && (
          <div className="flex flex-col gap-2" >
            <div className="lg:col-span-2">
              <Card className="bg-gray-100/80" ref={timeTableRef}>
                <TimeTableContainer
                  course={selectedCourse}
                  semester={selectedSemester}
                />
              </Card>
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex flex-col gap-2 justify-center items-center ">
        <hr className="text-black bg-gray-600 h-1 w-full mt-6" />
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#333333]">DBIT Heros</h1>
          <p className="mt-2 text-lg text-gray-700 font-medium italic">
            Meet the passionate educators who are shaping the future, one lesson
            at a time.
          </p>
        </div>
        <div
          className="flex gap-2 flex-wrap w-full justify-center items-center"
          id="/teachers"
        >
          {new Array(14).fill(1).map((_, index) => {
            return <TeacherCard key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}



// import TeacherCard from "@/components/home/TeacherCard";
// import TimeTableContainer from "@/components/home/TimeTableContainer";
// const HomePage = () => {
//   return (
//     <div className="bg-[#F7E3EC] w-full h-full pt-16 relative">
//       <TimeTableContainer />
//       <div className="w-full flex flex-col gap-2 justify-center items-center ">

//         <hr  className="text-black h-2 w-full"/>
//         <div className="text-center">
//           <h1 className="text-2xl font-semibold text-[#333333]">DBIT Heros</h1>
//           <p className="mt-2 text-lg text-gray-700 font-medium italic">
//             Meet the passionate educators who are shaping the future, one lesson at a time.
//           </p>
//         </div>
//         <div className="flex gap-2 flex-wrap w-full justify-center items-center" id="/teachers">
//           {
//             new Array(14).fill(1).map((_,index)=>{
//               return <TeacherCard key={index} />
//             })
//           }
          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
