"use client";

import { FileDown } from "lucide-react";
import html2pdf from "html2pdf.js";
import { MutableRefObject, useEffect, useState } from "react";

interface DownloadProps {
  timeTableRef: MutableRefObject<HTMLDivElement | null>;
}

const Download: React.FC<DownloadProps> = ({ timeTableRef }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This will set isClient to true once the component is mounted on the client side
    setIsClient(true);
  }, []);

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

  if (!isClient) {
    // Prevent rendering the button until client-side rendering is done
    return null;
  }

  return (
    <button
      className="w-[160px] h-[40px] flex justify-center items-center gap-2 font-semibold bg-[#031b4e] text-white rounded-md cursor-pointer"
      onClick={downloadPDF}
    >
      <FileDown /> <p>Download</p>
    </button>
  );
};

export default Download;
