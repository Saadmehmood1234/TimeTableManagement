import { div, p } from "framer-motion/client";
import React from "react";

const TeacherTable = ({ teacher, selectedTeacher }: any) => {
  console.log("My Teacher", teacher);
  return (
    <div>
      {teacher.map((teach: any, index: any) => {
        if (teach.name == selectedTeacher) {
          return <div key={index} className="flex flex-col">{teach.subjects.map((t:any,i:any)=>{
            return <p key={i}>{t}</p>
          })}</div>;
        }
      })}
    </div>
  );
};

export default TeacherTable;
