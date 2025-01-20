import { NextResponse } from "next/server";
import dbConnect from "@/utils/db-connect";
import CourseSubject from "@/models/CourseSubject";
import Timetable from "@/models/Timetable";
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const courseToDelete = url.pathname.split("/").pop();
    console.log("Teacher to delete:", courseToDelete);

    if (!courseToDelete) {
      return NextResponse.json(
        { error: "Course is required" },
        { status: 400 }
      );
    }

    await dbConnect();
    const result = await CourseSubject.deleteOne({ course: courseToDelete });
    if (result.deletedCount === 0) {
        return NextResponse.json(
          { message: "Course not found" },
          { status: 404 }
        );
      }
    const TimetableResponse=await Timetable.deleteMany({Course:courseToDelete})
    
    if (TimetableResponse.deletedCount === 0) {
        return NextResponse.json(
          { message: "Course not found" },
          { status: 404 }
        );
      }
    return NextResponse.json(
      { message: "Course deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting teacher:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
