// src/components/symptoms/SymptomsInput.jsx
import React from "react";

const SymptomsInput = ({ symptoms, onSymptomsChange }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label
        style={{
          display: "block",
          marginBottom: "10px",
          fontWeight: "600",
          color: "#4a5568",
        }}
      >
        📝 Describe Your Symptoms
      </label>
      <textarea
        placeholder="Describe your symptoms in detail... (e.g., headache, fever, fatigue, etc.)"
        value={symptoms}
        onChange={onSymptomsChange}
        style={{
          width: "100%",
          height: "120px",
          padding: "15px",
          fontSize: "16px",
          borderRadius: "12px",
          border: "2px solid #e2e8f0",
          resize: "vertical",
          outline: "none",
          transition: "border-color 0.3s ease",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#667eea")}
        onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
      />
    </div>
  );
};

export default SymptomsInput;
