
import { NextResponse } from "next/server";
import dbConnect from "@/utils/db-connect";
import MyTimetable from "@/models/Timetable";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    console.log(searchParams)
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
    console.log("Get TimeTable:",timetable)

    return NextResponse.json({ timetable: timetable?.data || [] });
  } catch (error) {
    console.error("Error fetching timetable:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// export async function PUT(request: Request) {
//   try {
//     const { course, semester, day, time, teacher, subject } = await request.json();

//     await dbConnect();
//  console.log("TimeTable:",course,semester,day,time,teacher,subject)
//     // Find or create timetable
//     let timetable = await MyTimetable.findOne({ course, semester });
     
//     if (!timetable) {
//       timetable = new MyTimetable({
//         course,
//         semester,
//         data: Array(5).fill(Array(6).fill(null)),
//       });
//     }
//     console.log("TimeTable:2",course,semester,day,time,teacher,subject)
//     // Validate teacher's maximum subjects per day
//     const teacherSubjectsForDay = timetable.data[day]?.filter(
//       (cell: any) => cell?.teacher === teacher
//     ).length || 0;

//     if (teacherSubjectsForDay >= 5) {
//       return NextResponse.json(
//         { error: "Teacher cannot teach more than 5 subjects in a day" },
//         { status: 400 }
//       );
//     }

//     // Check for timing conflicts
//     const teacherConflict = timetable.data.some(
//       (daySchedule: any, dayIndex: number) =>
//         daySchedule?.[time]?.teacher === teacher && dayIndex !== day
//     );

//     if (teacherConflict) {
//       return NextResponse.json(
//         { error: "Teacher has a timing conflict" },
//         { status: 400 }
//       );
//     }

//     // Update timetable
//     // Create a new array to avoid modifying the existing one
//     const newData = JSON.parse(JSON.stringify(timetable.data));
//     if (!Array.isArray(newData[day])) {
//       newData[day] = Array(6).fill(null);
//     }
//     newData[day][time] = { teacher, subject };
    
//     timetable.data = newData;
//     await timetable.save();

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error updating timetable:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
// export async function PUT(request: Request) {
//   try {
//     const { course, semester, day, time, teacher, subject } = await request.json();

//     await dbConnect();
//     console.log("TimeTable:", course, semester, day, time, teacher, subject);

//     // Find or create timetable
//     let timetable = await MyTimetable.findOne({ course, semester });

//     if (!timetable) {
//       timetable = new MyTimetable({
//         course,
//         semester,
//         data: Array(5).fill(Array(6).fill(null)), // Adjust number of days/slots as needed
//       });
//     }
//     console.log("TimeTable:2", course, semester, day, time, teacher, subject);

//     // Validate teacher's maximum subjects for a specific day
//     const teacherSubjectsForDay = timetable.data[day]?.filter(
//       (cell: any) => cell?.teacher === teacher
//     ).length || 0;

//     if (teacherSubjectsForDay >= 5) {
//       return NextResponse.json(
//         { error: "Teacher cannot teach more than 5 subjects in a day" },
//         { status: 400 }
//       );
//     }

//     // Check for timing conflicts on the specific day
//     const teacherConflict = timetable.data[day]?.[time]?.teacher === teacher;

//     if (teacherConflict) {
//       return NextResponse.json(
//         { error: "Teacher has a timing conflict at the specified time" },
//         { status: 400 }
//       );
//     }

//     // Update timetable data for the specified day and time slot
//     const newData = JSON.parse(JSON.stringify(timetable.data));
//     if (!Array.isArray(newData[day])) {
//       newData[day] = Array(6).fill(null); // Adjust number of time slots as needed
//     }
//     newData[day][time] = { teacher, subject };

//     timetable.data = newData;
//     await timetable.save();

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error updating timetable:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

export async function PUT(request: Request) {
  try {
    const { course, semester, day, time, teacher, subject } = await request.json();

    await dbConnect();
    console.log("Request data:", course, semester, day, time, teacher, subject);

    // Fetch all timetables that include this teacher in any slot
    const timetables = await MyTimetable.find({});

    // Count the total number of lectures the teacher has on the specified day
    let totalLecturesOnDay = 0;
    timetables.forEach((timetable:any) => {
      timetable.data.forEach((dayArray:any, dayIndex:any) => {
        if (dayIndex === day) { // Check only the specified day index
          dayArray.forEach((slot:any) => {
            if (slot && slot.teacher === teacher) {
              totalLecturesOnDay++;
            }
          });
        }
      });
    });

    console.log("Total lectures on the specified day:", totalLecturesOnDay);

    if (totalLecturesOnDay >= 5) {
      return NextResponse.json(
        { error: "Teacher cannot teach more than 5 subjects in a day across all timetables" },
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
    newData[day][time] = { teacher, subject };

    timetable.data = newData;
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
