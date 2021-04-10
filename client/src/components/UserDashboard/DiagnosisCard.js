import React from "react";

export default function DiagnosisCard({ disease, severity }) {
  const getSeverity = () => {
    if (severity < 5) return "px-3 py-3 bg-light";
    else if (severity == 5) return "px-3 py-3 bg-warning";
    else return "px-3 py-3 bg-danger";
  };
  return (
    <div
      style={{
        background: "#e9e8eb",
        borderRadius: "10px",
      }}
      className="m-2"
    >
      <h5 className={getSeverity()}>{disease}</h5>
    </div>
  );
}
