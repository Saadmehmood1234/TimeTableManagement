// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
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
// import { Save, Trash2, X } from "lucide-react";
// import { TimetableCell, TeacherWithSubjects } from "@/lib/types";

// interface TimetableSlotProps {
//   cell: TimetableCell | null;
//   isEditing: boolean;
//   onEdit: () => void;
//   onDelete: () => void;
//   onSave: () => void;
//   onCancel: () => void;
//   selectedTeacher: string;
//   selectedSubject: string;
//   teachers: TeacherWithSubjects[];
//   onTeacherChange: (teacher: string) => void;
//   onSubjectChange: (subject: string) => void;
//   getTeacherSubjects: (teacher: string) => string[];
// }

// export function TimetableSlot({
//   cell,
//   isEditing,
//   onEdit,
//   onDelete,
//   onSave,
//   onCancel,
//   selectedTeacher,
//   selectedSubject,
//   teachers,
//   onTeacherChange,
//   onSubjectChange,
//   getTeacherSubjects,
// }: TimetableSlotProps) {
//   if (isEditing) {
//     return (
//       <div className="space-y-2">
//         <Select value={selectedTeacher} onValueChange={onTeacherChange}>
//           <SelectTrigger>
//             <SelectValue placeholder="Select Teacher" />
//           </SelectTrigger>
//           <SelectContent>
//             {teachers.map((teacher) => (
//               <SelectItem key={teacher.name} value={teacher.name}>
//                 {teacher.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         {selectedTeacher && (
//           <Select value={selectedSubject} onValueChange={onSubjectChange}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select Subject" />
//             </SelectTrigger>
//             <SelectContent>
//               {getTeacherSubjects(selectedTeacher).map((subject) => (
//                 <SelectItem key={subject} value={subject}>
//                   {subject}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         )}

//         <div className="flex gap-2">
//           <Button size="sm" variant="outline" onClick={onCancel}>
//             <X className="h-4 w-4" />
//           </Button>
//           <Button
//             size="sm"
//             onClick={onSave}
//             disabled={!selectedTeacher || !selectedSubject}
//           >
//             <Save className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-[80px] relative">
//       <div
//         className="h-full flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
//         onClick={onEdit}
//       >
//         {cell ? (
//           <>
//             <p className="font-medium">{cell.teacher}</p>
//             <p className="text-sm text-gray-500">{cell.subject}</p>
//           </>
//         ) : (
//           <p className="text-gray-400">No class</p>
//         )}
//       </div>
//       {cell && (
//         <AlertDialog>
//           <AlertDialogTrigger asChild >
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute top-1 right-1 h-6 w-6"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <Trash2 className="h-4 w-4 text-destructive" />
//             </Button>
//           </AlertDialogTrigger>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Delete Slot</AlertDialogTitle>
//               <AlertDialogDescription>
//                 Are you sure you want to delete this slot? This action cannot be
//                 undone.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       )}
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Save, Trash2, X } from "lucide-react";
import { TimetableCell, TeacherWithSubjects } from "@/lib/types";
import { div } from "framer-motion/client";

interface TimetableSlotProps {
  cell: TimetableCell | null;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSave: () => void;
  onCancel: () => void;
  selectedTeacher: string;
  selectedSubject: string;
  teachers: TeacherWithSubjects[];
  onTeacherChange: (teacher: string) => void;
  onSubjectChange: (subject: string) => void;
  getTeacherSubjects: (teacher: string) => string[];
}

export function TimetableSlot({
  cell,
  isEditing,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  selectedTeacher,
  selectedSubject,
  teachers,
  onTeacherChange,
  onSubjectChange,
  getTeacherSubjects,
}: TimetableSlotProps) {
  if (isEditing) {
    return (
      <div className="space-y-2">
        <Select value={selectedTeacher} onValueChange={onTeacherChange}>
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
          <Select value={selectedSubject} onValueChange={onSubjectChange}>
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
          {/* Cancel button with X icon */}
          <Button size="sm" variant="outline" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
          {/* Save button with Save icon */}
          <Button
            size="sm"
            onClick={onSave}
            disabled={!selectedTeacher || !selectedSubject}
          >
            <Save className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80px] flex justify-center items-center">
      <div
        className="h-full flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
        onClick={onEdit}
      >
        {cell ? (
          <>
            <p className="font-medium">{cell.teacher}</p>
            <p className="text-sm text-gray-500">{cell.subject}</p>
          </>
        ) : (
         <div className="flex justify-center items-center w-full"> <p className="text-gray-400">No class</p></div>
        )}
      </div>
      {cell && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            {/* Delete button with Trash2 icon */}
            <Button
              variant="ghost"
              size="icon"
              className=" h-6 w-6"
              onClick={(e) => e.stopPropagation()} // Prevent onEdit trigger
            >
              <Trash2 className="text-black h-4 w-4 " />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Slot</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this slot? This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              {/* Confirm delete action */}
              <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}