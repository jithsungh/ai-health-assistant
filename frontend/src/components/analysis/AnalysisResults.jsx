// src/components/analysis/AnalysisResults.jsx
import React from "react";

const AnalysisResults = ({ analysisData, onSearchHospitals }) => {
  // Helper function to get severity color
  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case "low":
        return "#4caf50";
      case "medium":
        return "#ff9800";
      case "high":
        return "#f44336";
      default:
        return "#757575";
    }
  };

  // Helper function to get urgency color
  const getUrgencyColor = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case "routine":
        return "#4caf50";
      case "urgent":
        return "#ff9800";
      case "emergency":
        return "#f44336";
      default:
        return "#757575";
    }
  };

  if (!analysisData) return null;

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        backdropFilter: "blur(10px)",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          marginBottom: "25px",
          color: "#2d3748",
          textAlign: "center",
        }}
      >
        📊 Analysis Results
      </h2>

      {analysisData.error ? (
        <div
          style={{
            backgroundColor: "#fed7d7",
            color: "#c53030",
            padding: "15px",
            borderRadius: "10px",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          ⚠️ {analysisData.error}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Severity and Urgency Badges */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                backgroundColor: getSeverityColor(analysisData.severity),
                color: "white",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              🚨 Severity: {analysisData.severity || "Unknown"}
            </div>
            <div
              style={{
                backgroundColor: getUrgencyColor(analysisData.urgency),
                color: "white",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              ⏰ Urgency: {analysisData.urgency || "Unknown"}
            </div>
          </div>

          {/* Detected Symptoms */}
          <div
            style={{
              backgroundColor: "#e6fffa",
              padding: "20px",
              borderRadius: "15px",
              border: "1px solid #81e6d9",
            }}
          >
            <h3
              style={{
                color: "#234e52",
                marginBottom: "15px",
                fontSize: "1.3rem",
                fontWeight: "600",
              }}
            >
              🎯 Detected Symptoms
            </h3>
            <p
              style={{
                color: "#2d5a5f",
                fontSize: "16px",
                lineHeight: "1.5",
              }}
            >
              {analysisData.symptoms ||
                analysisData.detectedSymptoms ||
                "No specific symptoms detected"}
            </p>
          </div>

          {/* Hospital Type */}
          <div
            style={{
              backgroundColor: "#e6f3ff",
              padding: "20px",
              borderRadius: "15px",
              border: "1px solid #90cdf4",
            }}
          >
            <h3
              style={{
                color: "#1e4a8c",
                marginBottom: "15px",
                fontSize: "1.3rem",
                fontWeight: "600",
              }}
            >
              🏥 Recommended Hospital Type
            </h3>
            <p
              style={{
                color: "#2c5282",
                fontSize: "16px",
                lineHeight: "1.5",
                marginBottom: "15px",
              }}
            >
              {analysisData.hospitalType || "General Medicine"}
            </p>
            <button
              onClick={() => onSearchHospitals(analysisData.hospitalType)}
              style={{
                backgroundColor: "#2c5282",
                color: "white",
                padding: "10px 20px",
                fontSize: "14px",
                fontWeight: "600",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#1e4a8c")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#2c5282")}
            >
              🔍 Find Nearby {analysisData.hospitalType || "Hospitals"}
            </button>
          </div>

          {/* Possible Reasons */}
          {analysisData["possible-reasons"] && (
            <div
              style={{
                backgroundColor: "#fef5e7",
                padding: "20px",
                borderRadius: "15px",
                border: "1px solid #f6ad55",
              }}
            >
              <h3
                style={{
                  color: "#c05621",
                  marginBottom: "15px",
                  fontSize: "1.3rem",
                  fontWeight: "600",
                }}
              >
                🔍 Possible Reasons
              </h3>
              {Array.isArray(analysisData["possible-reasons"]) ? (
                <ul
                  style={{
                    color: "#744210",
                    fontSize: "16px",
                    lineHeight: "1.8",
                    paddingLeft: "20px",
                    margin: "0",
                  }}
                >
                  {analysisData["possible-reasons"].map((reason, index) => (
                    <li
                      key={index}
                      style={{
                        marginBottom: "8px",
                        listStyleType: "disc",
                      }}
                    >
                      {reason}
                    </li>
                  ))}
                </ul>
              ) : (
                <div
                  style={{
                    color: "#744210",
                    fontSize: "16px",
                    lineHeight: "1.8",
                  }}
                >
                  {typeof analysisData["possible-reasons"] === "string" &&
                  analysisData["possible-reasons"].includes("•") ? (
                    <ul
                      style={{
                        paddingLeft: "20px",
                        margin: "0",
                      }}
                    >
                      {analysisData["possible-reasons"]
                        .split("•")
                        .filter((item) => item.trim())
                        .map((reason, index) => (
                          <li
                            key={index}
                            style={{
                              marginBottom: "8px",
                              listStyleType: "disc",
                            }}
                          >
                            {reason.trim()}
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <ul
                      style={{
                        paddingLeft: "20px",
                        margin: "0",
                      }}
                    >
                      <li
                        style={{
                          marginBottom: "8px",
                          listStyleType: "disc",
                        }}
                      >
                        {analysisData["possible-reasons"]}
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Diet Plan */}
          <div
            style={{
              backgroundColor: "#fff5e6",
              padding: "20px",
              borderRadius: "15px",
              border: "1px solid #fbb036",
            }}
          >
            <h3
              style={{
                color: "#b7791f",
                marginBottom: "15px",
                fontSize: "1.3rem",
                fontWeight: "600",
              }}
            >
              🥗 Recommended Diet Plan
            </h3>
            {analysisData.dietPlan ? (
              Array.isArray(analysisData.dietPlan) ? (
                <ul
                  style={{
                    color: "#744210",
                    fontSize: "16px",
                    lineHeight: "1.6",
                    paddingLeft: "20px",
                    margin: "0",
                  }}
                >
                  {analysisData.dietPlan.map((item, index) => (
                    <li key={index} style={{ marginBottom: "8px" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p
                  style={{
                    color: "#744210",
                    fontSize: "16px",
                    lineHeight: "1.6",
                  }}
                >
                  {analysisData.dietPlan}
                </p>
              )
            ) : (
              <p
                style={{
                  color: "#744210",
                  fontSize: "16px",
                  lineHeight: "1.6",
                }}
              >
                Maintain a balanced diet and stay hydrated
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;
