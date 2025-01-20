import { NextResponse } from "next/server";
import dbConnect from "@/utils/db-connect";
import Teacher from "@/models/Teacher";
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const teacherName = url.pathname.split("/").pop();  

    if (!teacherName) {
      return NextResponse.json(
        { error: "Teacher name is required" },
        { status: 400 }
      );
    }

    await dbConnect();
    const result = await Teacher.deleteOne({ name: teacherName });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Teacher deleted successfully" },
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
