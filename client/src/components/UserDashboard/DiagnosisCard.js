import React from "react";

export default function DiagnosisCard({ disease, date }) {
  return (
    <div
      style={{
        background: "#e9e8eb",
        borderRadius: "10px",
      }}
      className="m-2"
    >
      <h5 className="px-3 pt-3">{disease}</h5>
      <p className="px-4">{date}</p>
    </div>
  );
}
