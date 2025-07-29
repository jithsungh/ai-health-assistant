// src/components/hospitals/HospitalsList.jsx
import React from "react";
import RadiusSlider from "./RadiusSlider";

const HospitalsList = ({
  hospitals,
  loadingHospitals,
  radius = 15,
  onRadiusChange,
  onSearchHospitals,
  hospitalType = "",
}) => {
  const handleRadiusChange = (newRadius) => {
    onRadiusChange(newRadius);
    // Automatically search when radius changes
    if (onSearchHospitals) {
      setTimeout(() => {
        onSearchHospitals(hospitalType, newRadius);
      }, 300); // Small delay for better UX
    }
  };

  return (
    <div
      style={{
        marginTop: "30px",
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
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        🏥 Nearby Hospitals
      </h2>

      {/* Radius Slider */}
      <RadiusSlider radius={radius} onRadiusChange={handleRadiusChange} />

      {loadingHospitals ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px 20px",
            fontSize: "1.2rem",
            color: "#667eea",
            background: "linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)",
            borderRadius: "16px",
            border: "2px dashed #cbd5e0",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "15px" }}>⏳</div>
          Loading nearby hospitals within {radius}km...
        </div>
      ) : !hospitals || hospitals.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px 20px",
            fontSize: "1.1rem",
            color: "#718096",
            background: "linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%)",
            borderRadius: "16px",
            border: "2px solid #f56565",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "15px" }}>🔍</div>
          <p style={{ margin: "0 0 10px 0", fontWeight: "600" }}>
            No hospitals found within {radius}km radius
          </p>
          <p style={{ margin: "0", fontSize: "14px", opacity: "0.8" }}>
            Try increasing the search radius or check your location
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {hospitals.map((hospital, index) => (
            <div
              key={index}
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                borderRadius: "16px",
                padding: "25px",
                boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                border: "2px solid #e2e8f0",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-5px)";
                e.target.style.boxShadow = "0 12px 35px rgba(0,0,0,0.15)";
                e.target.style.borderColor = "#667eea";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
                e.target.style.borderColor = "#e2e8f0";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <div
                  style={{
                    fontSize: "32px",
                    marginRight: "15px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  🏥
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "700",
                      color: "#2d3748",
                      margin: "0",
                    }}
                  >
                    {hospital.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "5px",
                    }}
                  >
                    <span
                      style={{
                        color: "#48bb78",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      ⭐ {hospital.rating || "N/A"}
                    </span>
                    {hospital.distance && (
                      <span
                        style={{
                          color: "#667eea",
                          fontSize: "14px",
                          fontWeight: "600",
                          marginLeft: "15px",
                        }}
                      >
                        📍 {hospital.distance}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p
                style={{
                  color: "#4a5568",
                  fontSize: "14px",
                  margin: "15px 0",
                  lineHeight: "1.6",
                }}
              >
                📍 {hospital.address}
              </p>

              {hospital.phone && (
                <p
                  style={{
                    color: "#48bb78",
                    fontSize: "14px",
                    fontWeight: "600",
                    margin: "10px 0",
                  }}
                >
                  📞 {hospital.phone}
                </p>
              )}

              {hospital.openingHours && (
                <p
                  style={{
                    color: hospital.openingHours.includes("Open")
                      ? "#48bb78"
                      : "#ed8936",
                    fontSize: "12px",
                    fontWeight: "600",
                    margin: "10px 0",
                    padding: "5px 10px",
                    background: hospital.openingHours.includes("Open")
                      ? "#f0fff4"
                      : "#fffaf0",
                    borderRadius: "6px",
                    border: hospital.openingHours.includes("Open")
                      ? "1px solid #9ae6b4"
                      : "1px solid #fbd38d",
                  }}
                >
                  🕒 {hospital.openingHours}
                </p>
              )}

              {hospital.types && hospital.types.length > 0 && (
                <div style={{ marginTop: "15px" }}>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}
                  >
                    {hospital.types.slice(0, 3).map((type, typeIndex) => (
                      <span
                        key={typeIndex}
                        style={{
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          color: "white",
                          padding: "3px 8px",
                          borderRadius: "12px",
                          fontSize: "11px",
                          fontWeight: "600",
                        }}
                      >
                        {type.replace(/_/g, " ")}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {hospital.googleMapsUrl && (
                <button
                  onClick={() => window.open(hospital.googleMapsUrl, "_blank")}
                  style={{
                    width: "100%",
                    marginTop: "15px",
                    padding: "12px",
                    background:
                      "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.02)";
                    e.target.style.background =
                      "linear-gradient(135deg, #38a169 0%, #2f855a 100%)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.background =
                      "linear-gradient(135deg, #48bb78 0%, #38a169 100%)";
                  }}
                >
                  🗺️ Get Directions
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {hospitals && hospitals.length > 0 && (
        <div
          style={{
            marginTop: "25px",
            padding: "15px",
            background: "linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%)",
            borderRadius: "12px",
            border: "2px solid #81e6d9",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0",
              color: "#285e61",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            ✅ Found {hospitals.length} hospitals within {radius}km radius
          </p>
        </div>
      )}
    </div>
  );
};

export default HospitalsList;
