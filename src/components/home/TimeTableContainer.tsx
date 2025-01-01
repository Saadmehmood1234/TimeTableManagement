"use client";
import { FileDown } from "lucide-react";
import { useRef } from "react";
import html2pdf from "html2pdf.js";
const TimeTableContainer = () => {
  const timeTableRef = useRef(null);

  const downloadPDF = () => {
    const element = timeTableRef.current;
    if (!element) return;

    const options = {
      margin: [10, 10, 10, 10], // Set margin if needed
      filename: "timetable.pdf",
      image: { type: "png", quality: 1 },
      html2canvas: { scale: 2 }, // Increase scale for better quality
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };

    // Use html2pdf to convert HTML content to PDF
    html2pdf()
      .from(element) // Convert the content from the ref
      .set(options) // Apply settings
      .save(); // Download the PDF
  };

  return (
    <div>
      <div ref={timeTableRef} className="bg-[#F7E3EC]">
        <div className="w-full flex justify-center gap-10 items-center z-20">
          <h1 className="text-3xl font-semibold drop-shadow-md animeFont">
          Weekly TimeTable
          </h1>
          <button
            className="w-[160px] h-[40px] flex justify-center items-center gap-2 font-semibold bg-[#031b4e] text-white rounded-md cursor-pointer"
            onClick={downloadPDF}
          >
            {" "}
            <FileDown /> <p>Download</p>
          </button>
        </div>

        <div className=" p-5 flex flex-col w-full  gap-2 z-20">
          <div className="flex gap-2 justify-center items-center">
            <div className="bg-[#AFCDE9] border-2 border-black flex justify-center items-center w-[140px] h-[70px] shadow-md cursor-pointer">
              <h2 className="font-semibold drop-shadow-md text-xl">Time</h2>
            </div>
            <div className="bg-[#FFA5BA] border-2 border-black flex justify-center items-center  w-[140px] h-[70px] shadow-md cursor-pointer">
              <h2 className="font-semibold drop-shadow-md text-2xl">Monday</h2>
            </div>
            <div className="bg-[#FFA5BA] border-2 border-black flex justify-center items-center  w-[140px] h-[70px] shadow-md cursor-pointer">
              <h2 className="font-semibold drop-shadow-md text-2xl">Tuesday</h2>
            </div>
            <div className="bg-[#FFA5BA] border-2 border-black flex justify-center items-center  w-[140px] h-[70px] shadow-md cursor-pointer">
              <h2 className="font-semibold drop-shadow-md text-2xl">
                Wednesday
              </h2>
            </div>
            <div className="bg-[#FFA5BA] border-2 border-black flex justify-center items-center  w-[140px] h-[70px] shadow-md cursor-pointer">
              <h2 className="font-semibold drop-shadow-md text-2xl">
                ThursDay
              </h2>
            </div>
            <div className="bg-[#FFA5BA] border-2 border-black flex justify-center items-center  w-[140px] h-[70px] shadow-md cursor-pointer ">
              <h2 className="font-semibold drop-shadow-md text-2xl">Tuesday</h2>
            </div>
          </div>

          {new Array(6).fill(1).map((_, index) => (
            <div className="flex gap-2 justify-center items-center" key={index}>
              <div className="bg-[#AFCDE9]  border-2 border-black flex justify-center rounded items-center w-[140px] h-[70px] shadow-md cursor-pointer">
                <h2 className="font-semibold drop-shadow-md text-xl">
                  7:00-8:30
                </h2>
              </div>
              <div className="bg-transparent border-2 border-[#333333] flex justify-center items-center w-[140px] h-[70px] shadow-md cursor-pointer px-2">
                <div className="flex flex-col justify-center items-center w-full h-full overflow-hidden">
                  <p className="text-[15px] font-semibold truncate w-full overflow-hidden whitespace-nowrap">
                    Operating Systemhfhfghfhfgh
                  </p>
                  <p className="text-[10px] font-medium capitalize">
                    Amandeep Singh
                  </p>
                  <p className="text-[10px] font-medium capitalize">
                    Amandeep Singh
                  </p>
                </div>
              </div>
              <div className="bg-transparent border-2 border-[#333333] flex justify-center items-center w-[140px] h-[70px] shadow-md cursor-pointer px-2">
                <div className="flex flex-col justify-center items-center w-full h-full overflow-hidden">
                  <p className="text-[15px] font-semibold truncate w-full overflow-hidden whitespace-nowrap">
                    Operating Systemhfhfghfhfgh
                  </p>
                  <p className="text-[10px] font-medium capitalize">
                    Amandeep Singh
                  </p>
                  <p className="text-[10px] font-medium capitalize">
                    Amandeep Singh
                  </p>
                </div>
              </div>
              <div className="bg-transparent border-2 border-[#333333] flex justify-center items-center w-[140px] h-[70px] shadow-md cursor-pointer px-2">
                <div className="flex flex-col justify-center items-center w-full h-full overflow-hidden">
                  <p className="text-[15px] font-semibold truncate w-full overflow-hidden whitespace-nowrap">
                    Operating Systemhfhfghfhfgh
                  </p>
                  <p className="text-[10px] font-medium capitalize">
                    Amandeep Singh
                  </p>
                  <p className="text-[10px] font-medium capitalize">
                    Amandeep Singh
                  </p>
                </div>
              </div>
              <div className="bg-transparent border-2 border-[#333333] flex justify-center items-center w-[140px] h-[70px] shadow-md cursor-pointer px-2">
                <div className="flex flex-col justify-center items-center w-full h-full overflow-hidden">
                  <p className="text-[15px] font-semibold truncate w-full overflow-hidden whitespace-nowrap">
                    Operating Systemhfhfghfhfgh
                  </p>
                  <p className="text-[10px] font-medium capitalize">
                    Amandeep Singh
                  </p>
                  <p className="text-[10px] font-medium capitalize">
                    Amandeep Singh
                  </p>
                </div>
              </div>{" "}
              <div className="bg-transparent border-2 border-[#333333] flex justify-center items-center w-[140px] h-[70px] shadow-md cursor-pointer px-2">
                <div className="flex flex-col justify-center items-center w-full h-full overflow-hidden">
                  <p className="text-[15px] font-semibold truncate w-full overflow-hidden whitespace-nowrap">
                    Operating Systemhfhfghfhfgh
                  </p>
                  <p className="text-[10px] font-medium capitalize">
                    Amandeep Singh
                  </p>
                  <p className="text-[10px] font-medium capitalize">
                    Amandeep Singh
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeTableContainer;
