"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function PDFPreviewPage() {
  const [pdfData, setPdfData] = useState<string | null>(null);

  useEffect(() => {
    const base64 = sessionStorage.getItem("pdfData");
    if (base64) {
      setPdfData(base64);
    }
  }, []);

  if (!pdfData) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>No PDF Found</h2>
        <p>The PDF data is missing or the session has expired.</p>
        <Link href="/" className="text-blue-500 underline">← Go back to the form</Link>
      </div>
    );
  }

  return (
    // <div style={{ padding: "20px" }}>
    //   <h1 className="text-2xl font-semibold mb-4">PDF Preview</h1>
      <iframe
        src={`data:application/pdf;base64,${pdfData}`}
        width="100%"
        height="1000px"
        title="PDF Preview"
        // style={{ border: "1px solid #ccc" }}
      />
    // </div>
  );
}
