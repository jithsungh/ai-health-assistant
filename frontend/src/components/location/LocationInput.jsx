// src/components/location/LocationInput.jsx
import React from "react";

const LocationInput = ({ lat, lng, address, onGetLocation }) => {
  return (
    <div>
      <button
        onClick={onGetLocation}
        style={{
          width: "100%",
          backgroundColor: lat && lng ? "#48bb78" : "#667eea",
          color: "white",
          padding: "20px",
          fontSize: "16px",
          fontWeight: "600",
          border: "none",
          borderRadius: "15px",
          marginBottom: "25px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        }}
      >
        {lat && lng ? "✅ Location Obtained" : "📍 Get My Location"}
      </button>

      {address && (
        <div
          style={{
            backgroundColor: "#f0f9ff",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "25px",
            border: "2px solid #bfdbfe",
          }}
        >
          <p style={{ margin: "8px 0", color: "#1e40af", fontWeight: "600" }}>
            <strong>📌 Current Location:</strong>
          </p>
          <p style={{ margin: "8px 0", color: "#3730a3", fontSize: "15px" }}>
            {address}
          </p>
          {lat && lng && (
            <p style={{ margin: "8px 0", color: "#6366f1", fontSize: "13px" }}>
              <strong>Coordinates:</strong> {lat.toFixed(4)}, {lng.toFixed(4)}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
