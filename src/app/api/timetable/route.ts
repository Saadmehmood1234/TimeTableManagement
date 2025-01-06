import { NextResponse } from "next/server";
import dbConnect from "@/utils/db-connect";
import MyTimetable from "@/models/Timetable";
import { NextRequest } from "next/server";
import Time from "@/models/Time";
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    console.log(searchParams);
    const course = searchParams.get("course");
    const semester = searchParams.get("semester");

    if (!course || !semester) {
      return NextResponse.json(
        { error: "Course and semester are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const timetable = await MyTimetable.findOne({ course, semester });
    console.log("Get TimeTable:", timetable);

    return NextResponse.json({ timetable: timetable?.data || [] });
  } catch (error) {
    console.error("Error fetching timetable:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();

    const { course, semester, day, time } = await request.json();

    const timetable = await MyTimetable.findOne({ course, semester });

    if (!timetable) {
      return NextResponse.json(
        { message: "Timetable not found" },
        { status: 404 }
      );
    }

    // Clear the slot
    timetable.data[day][time] = null;
    await timetable.save();

    return NextResponse.json(
      { message: "Slot deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
export async function PUT(request: Request) {
  try {
    const { course, semester, day, time, teacher, subject } =
      await request.json();
    const Days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    await dbConnect();
    console.log("Request data:", course, semester, day, time, teacher, subject);
    console.log(time, course, semester, day, teacher, subject);
    // Fetch all timetables that include this teacher in any slot
    const timetables = await MyTimetable.find({});
    const courseTimes = await Time.find();
    let myTime = courseTimes[0].slots[Number(time)];
    console.log("All Time", myTime.start);
    console.log("All Time", myTime.end);
    let start = myTime.start;
    let end = myTime.end;
    let days = Days[Number(day)];
    console.log("MyData", courseTimes);
    // Count the total number of lectures the teacher has on the specified day
    let totalLecturesOnDay = 0;
    let hasTimeConflict = false;

    timetables.forEach((timetable: any) => {
      timetable.data.forEach((dayArray: any, dayIndex: any) => {
        if (dayIndex === day) {
          // Check only the specified day index
          dayArray.forEach((slot: any, slotIndex: any) => {
            if (slot && slot.teacher === teacher) {
              totalLecturesOnDay++;
              // Check if the teacher is already assigned at the same time slot on that day
              if (slotIndex === time) {
                hasTimeConflict = true;
              }
            }
          });
        }
      });
    });

    console.log("Total lectures on the specified day:", totalLecturesOnDay);

    if (totalLecturesOnDay >= 5) {
      return NextResponse.json(
        {
          error:
            "Teacher cannot teach more than 5 subjects in a day across all timetables",
        },
        { status: 400 }
      );
    }

    if (hasTimeConflict) {
      return NextResponse.json(
        {
          error:
            "Teacher is already assigned at this time on the specified day",
        },
        { status: 400 }
      );
    }

    // Find or create a timetable for the current course and semester
    let timetable = await MyTimetable.findOne({ course, semester });

    if (!timetable) {
      timetable = new MyTimetable({
        course,
        semester,
        data: Array(5).fill(Array(6).fill(null)), // Adjust number of days/slots as needed
      });
    }

    // Check for timing conflicts on the specific day in the current timetable
    const teacherConflict = timetable.data[day]?.[time]?.teacher === teacher;

    if (teacherConflict) {
      return NextResponse.json(
        { error: "Teacher has a timing conflict at the specified time" },
        { status: 400 }
      );
    }

    // Update timetable data for the specified day and time slot
    const newData = JSON.parse(JSON.stringify(timetable.data));
    if (!Array.isArray(newData[day])) {
      newData[day] = Array(6).fill(null); // Adjust number of time slots as needed
    }
    newData[day][time] = {
      teacher,
      subject: subject,
      day: days,
      start: start,
      end: end,
      teacherCourse: course,
      teacherSemester: semester,
    };
    console.log("Updated Date", newData[0][0]);
    timetable.data = newData;
    console.log("fhewjhfdsf", timetable.data[0][0]);
    await timetable.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating timetable:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
