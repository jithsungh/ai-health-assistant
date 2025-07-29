// src/components/symptoms/SymptomsInput.jsx
import React from "react";

const SymptomsInput = ({ symptoms, onSymptomsChange }) => {
  const wordCount = symptoms
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  return (
    <div style={{ marginBottom: "20px" }}>
      <label
        style={{
          display: "block",
          marginBottom: "15px",
          fontWeight: "700",
          color: "#4a5568",
          fontSize: "18px",
          textAlign: "center",
        }}
      >
        📝 Describe Your Symptoms in Detail
      </label>
      <div style={{ position: "relative" }}>
        <textarea
          placeholder="Please describe your symptoms in detail...

Examples:
• Headache since this morning, sharp pain on the left side
• Fever 102°F for 2 days, with chills and body aches  
• Chest pain when breathing deeply, started after exercise
• Persistent cough for a week, with yellow phlegm
• Stomach pain after eating, nausea and vomiting

Include: when it started, severity (1-10), location, what makes it better/worse"
          value={symptoms}
          onChange={onSymptomsChange}
          style={{
            width: "100%",
            height: "200px",
            padding: "25px",
            fontSize: "16px",
            borderRadius: "16px",
            border: "3px solid #e2e8f0",
            resize: "vertical",
            outline: "none",
            transition: "all 0.3s ease",
            boxSizing: "border-box",
            background: "linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            fontFamily: "inherit",
            lineHeight: "1.6",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#667eea";
            e.target.style.background =
              "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)";
            e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.15)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e2e8f0";
            e.target.style.background =
              "linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)";
            e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
          }}
        />

        {/* Enhanced word count and helpful tips */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "12px",
            fontSize: "12px",
            color: "#718096",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {symptoms.trim() && (
              <span
                style={{
                  color:
                    wordCount >= 15
                      ? "#48bb78"
                      : wordCount >= 8
                      ? "#ed8936"
                      : "#e53e3e",
                  fontWeight: "600",
                  padding: "4px 8px",
                  borderRadius: "12px",
                  background:
                    wordCount >= 15
                      ? "#f0fff4"
                      : wordCount >= 8
                      ? "#fffaf0"
                      : "#fed7d7",
                }}
              >
                {wordCount} words{" "}
                {wordCount < 8 && "(add more details for better analysis)"}
              </span>
            )}
            <span
              style={{
                color: "#667eea",
                fontWeight: "600",
                padding: "4px 8px",
                borderRadius: "12px",
                background: "#edf2f7",
              }}
            >
              💡 Be specific for accurate results
            </span>
          </div>
        </div>

        {/* Helpful examples */}
        {!symptoms.trim() && (
          <div
            style={{
              marginTop: "15px",
              padding: "15px",
              background: "linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%)",
              borderRadius: "12px",
              border: "2px solid #81e6d9",
            }}
          >
            <h4
              style={{
                margin: "0 0 10px 0",
                color: "#234e52",
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              💡 Tips for Better Analysis:
            </h4>
            <ul
              style={{
                margin: "0",
                paddingLeft: "20px",
                color: "#2c7a7b",
                fontSize: "12px",
                lineHeight: "1.5",
              }}
            >
              <li>Include when symptoms started (hours, days, weeks)</li>
              <li>Rate pain/discomfort on scale of 1-10</li>
              <li>Mention exact location on your body</li>
              <li>Describe what makes it better or worse</li>
              <li>List any associated symptoms</li>
              <li>Mention relevant medical history if applicable</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomsInput;
