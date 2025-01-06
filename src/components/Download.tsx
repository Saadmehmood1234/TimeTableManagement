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
    setIsClient(true);
  }, []);

  const downloadPDF = () => {
    const element = timeTableRef.current;
    if (!element) return;

    const options = {
      margin: [10, 10, 10, 10],
      filename: "timetable.pdf",
      image: { type: "png", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };

    html2pdf()
      .from(element)
      .set(options)
      .save();
  };

  if (!isClient) {
    return null; // Prevent rendering on the server-side
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
