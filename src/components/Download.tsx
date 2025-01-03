"use client";
import { FileDown } from "lucide-react";
import { useRef } from "react";
import html2pdf from "html2pdf.js";
const Download = () => {
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
      <div ref={timeTableRef}>
        <div className="flex justify-center gap-10 items-center z-20">
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

       
      </div>
    </div>
  );
};

export default Download;
