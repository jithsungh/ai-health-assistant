// src/components/common/NavigationBar.jsx
import React from "react";

const NavigationBar = ({
  currentStep,
  onStepChange,
  onBack,
  onClear,
  canGoBack,
  steps = [
    { id: 1, label: "Location", icon: "📍" },
    { id: 2, label: "Symptoms", icon: "📝" },
    { id: 3, label: "Analysis", icon: "🔍" },
    { id: 4, label: "Hospitals", icon: "🏥" },
  ],
}) => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px 30px",
        borderRadius: "20px",
        marginBottom: "30px",
        boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'url(\'data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.1"><path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/></g></g></svg>\')',
          opacity: 0.1,
        }}
      />

      {/* Top Action Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Back Button */}
        <button
          onClick={onBack}
          disabled={!canGoBack}
          style={{
            background: canGoBack
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(255, 255, 255, 0.1)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            color: canGoBack ? "white" : "rgba(255, 255, 255, 0.5)",
            padding: "10px 16px",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: canGoBack ? "pointer" : "not-allowed",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onMouseEnter={(e) => {
            if (canGoBack) {
              e.target.style.background = "rgba(255, 255, 255, 0.3)";
              e.target.style.transform = "translateX(-3px)";
            }
          }}
          onMouseLeave={(e) => {
            if (canGoBack) {
              e.target.style.background = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "translateX(0)";
            }
          }}
        >
          ⬅️ Back
        </button>

        {/* Title */}
        <h1
          style={{
            color: "white",
            fontSize: "1.8rem",
            fontWeight: "700",
            margin: "0",
            textAlign: "center",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          🩺 AI Health Assistant
        </h1>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={onClear}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              color: "white",
              padding: "10px 16px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255, 94, 77, 0.8)";
              e.target.style.borderColor = "rgba(255, 94, 77, 1)";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.2)";
              e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
              e.target.style.transform = "scale(1)";
            }}
          >
            🗑️ Clear
          </button>

          <button
            onClick={() => window.location.reload()}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              color: "white",
              padding: "10px 16px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(72, 187, 120, 0.8)";
              e.target.style.borderColor = "rgba(72, 187, 120, 1)";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.2)";
              e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
              e.target.style.transform = "scale(1)";
            }}
          >
            🔄 Restart
          </button>
        </div>
      </div>

      {/* Step Navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Progress Line */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "0",
            right: "0",
            height: "4px",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "2px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #48bb78 0%, #38a169 100%)",
              borderRadius: "2px",
              transition: "width 0.8s ease",
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              boxShadow: "0 2px 8px rgba(72, 187, 120, 0.4)",
            }}
          />
        </div>

        {/* Step Buttons */}
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => onStepChange(step.id)}
            disabled={step.id > currentStep}
            style={{
              background:
                step.id <= currentStep
                  ? "linear-gradient(135deg, #48bb78 0%, #38a169 100%)"
                  : "rgba(255, 255, 255, 0.2)",
              border:
                step.id === currentStep
                  ? "3px solid white"
                  : "2px solid rgba(255, 255, 255, 0.3)",
              color: "white",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              fontSize: "24px",
              cursor: step.id <= currentStep ? "pointer" : "not-allowed",
              transition: "all 0.4s ease",
              position: "relative",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              boxShadow:
                step.id <= currentStep
                  ? "0 6px 20px rgba(72, 187, 120, 0.4)"
                  : "0 4px 15px rgba(0,0,0,0.2)",
            }}
            onMouseEnter={(e) => {
              if (step.id <= currentStep) {
                e.target.style.transform = "translateY(-5px) scale(1.1)";
                e.target.style.boxShadow = "0 8px 25px rgba(72, 187, 120, 0.6)";
              }
            }}
            onMouseLeave={(e) => {
              if (step.id <= currentStep) {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow =
                  step.id <= currentStep
                    ? "0 6px 20px rgba(72, 187, 120, 0.4)"
                    : "0 4px 15px rgba(0,0,0,0.2)";
              }
            }}
          >
            <div style={{ fontSize: "20px", marginBottom: "2px" }}>
              {step.icon}
            </div>
          </button>
        ))}
      </div>

      {/* Step Labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "15px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {steps.map((step) => (
          <div
            key={step.id}
            style={{
              textAlign: "center",
              width: "60px",
            }}
          >
            <span
              style={{
                color:
                  step.id <= currentStep ? "white" : "rgba(255, 255, 255, 0.6)",
                fontSize: "12px",
                fontWeight: "600",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationBar;
