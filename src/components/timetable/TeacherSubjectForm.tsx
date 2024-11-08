// "use client";

// import { useState } from "react";
// import { Plus, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/hooks/use-toast";

// interface TeacherSubjectFormProps {
//   course: string;
//   semester: string;
// }

// export function TeacherSubjectForm({ course, semester }: TeacherSubjectFormProps) {
//   const { toast } = useToast();
//   const [teacherName, setTeacherName] = useState("");
//   const [subject, setSubject] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("/api/teachers-subjects", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           course,
//           semester,
//           teacherName,
//           subject,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to add teacher and subject");
//       }

//       toast({
//         title: "Success",
//         description: "Teacher and subject added successfully",
//       });

//       // Reset form
//       setTeacherName("");
//       setSubject("");
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to add teacher and subject",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="space-y-2">
//         <Label htmlFor="teacherName">Teacher Name</Label>
//         <Input
//           id="teacherName"
//           value={teacherName}
//           onChange={(e) => setTeacherName(e.target.value)}
//           placeholder="Enter teacher name"
//           required
//         />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="subject">Subject</Label>
//         <Input
//           id="subject"
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//           placeholder="Enter subject name"
//           required
//         />
//       </div>

//       <Button type="submit" className="w-full">
//         <Plus className="w-4 h-4 mr-2" />
//         Add Teacher & Subject
//       </Button>
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface TeacherSubjectFormProps {
  course: string;
  semester: string;
}

export function TeacherSubjectForm({ course, semester }: TeacherSubjectFormProps) {
  const { toast } = useToast();
  const [teacherName, setTeacherName] = useState("");
  const [subject, setSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherName || !subject) {
      toast({
        title: "Error",
        description: "Teacher name and subject are required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/teachers-subjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course,
          semester,
          teacherName,
          subject,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add teacher and subject");
      }

      toast({
        title: "Success",
        description: "Teacher and subject added successfully",
      });

      // Reset form
      setTeacherName("");
      setSubject("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add teacher and subject",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="teacherName">Teacher Name</Label>
        <Input
          id="teacherName"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
          placeholder="Enter teacher name"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subject name"
          required
          disabled={isSubmitting}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        <Plus className="w-4 h-4 mr-2" />
        {isSubmitting ? "Adding..." : "Add Teacher & Subject"}
      </Button>
    </form>
  );
}