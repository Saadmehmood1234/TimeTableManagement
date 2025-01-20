import { NextResponse } from "next/server";
import dbConnect from "@/utils/db-connect";
import Teacher from "@/models/Teacher";
import Timetable from "@/models/Timetable";

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const teacherName = url.pathname.split("/").pop(); // Extract teacher name from URL

    if (!teacherName) {
      return NextResponse.json(
        { error: "Teacher name is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Fetch all timetables
    const timetables = await Timetable.find({});

    let teacherFound = false;

    // Iterate over each timetable
    for (let k = 0; k < timetables.length; k++) {
      const timetable = timetables[k];

      // Iterate over each row and column in the 2D `data` array
      for (let i = 0; i < timetable.data.length; i++) {
        for (let j = 0; j < timetable.data[i].length; j++) {
          const classData = timetable.data[i][j];

          // Check if the teacher matches
          if (classData && classData.teacher === teacherName) {
            teacherFound = true;

            // Remove the teacher by setting the entry to `null`
            timetable.data[i][j] = null;
          }
        }
      }

      // Save the updated timetable back to the database
      await timetable.save();
    }

    if (!teacherFound) {
      return NextResponse.json(
        { message: "No timetables found for the specified teacher" },
        { status: 404 }
      );
    }

    const teacherResponse = await Teacher.deleteOne({ name: teacherName });

    if (teacherResponse.deletedCount === 0) {
      return NextResponse.json(
        { message: "Teacher not found in the Teacher collection" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message:
          "Teacher and associated timetable entries deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting teacher and timetables:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
