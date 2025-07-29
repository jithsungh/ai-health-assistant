import React, { useState, useRef, useEffect } from "react";
import ProgressIndicator from "./components/common/ProgressIndicator";
import StepLabels from "./components/common/StepLabels";
import MessageDisplay from "./components/common/MessageDisplay";
import LocationInput from "./components/location/LocationInput";
import FileUpload from "./components/symptoms/FileUpload";
import SymptomsInput from "./components/symptoms/SymptomsInput";
import AnalysisResults from "./components/analysis/AnalysisResults";
import HospitalsList from "./components/hospitals/HospitalsList";
import useLocation from "./hooks/useLocation";
import useHealthAnalysis from "./hooks/useHealthAnalysis";
import useHospitals from "./hooks/useHospitals";

function App() {
  const [symptoms, setSymptoms] = useState("");
  const [file, setFile] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Refs for auto-scrolling
  const analysisRef = useRef(null);
  const hospitalsRef = useRef(null);

  // Custom hooks
  const {
    lat,
    lng,
    address,
    locationError,
    isGettingLocation,
    getCurrentLocation,
    hasLocation,
  } = useLocation();

  const {
    analysisData,
    loading,
    error: analysisError,
    analyzeSymptoms,
    hasAnalysis,
  } = useHealthAnalysis();

  const {
    hospitals,
    loadingHospitals,
    hospitalsError,
    searchNearbyHospitals,
    hasHospitals,
  } = useHospitals();

  // Function to display messages to the user
  const showMessage = (text, type = "info") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 5000);
  };

  // Auto-scroll to element
  const scrollToElement = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  // Handle location getting
  const handleGetLocation = async () => {
    const success = await getCurrentLocation();
    if (success) {
      setCurrentStep(Math.max(currentStep, 2));
      showMessage("Location obtained successfully!", "success");
    } else if (locationError) {
      showMessage(locationError, "error");
    }
  };

  // Handle symptom analysis
  const handleAnalyze = async () => {
    const success = await analyzeSymptoms(symptoms, file);
    if (success) {
      setShowAnalysis(true);
      setCurrentStep(3);
      showMessage("Analysis complete!", "success");

      // Auto-scroll to analysis section
      setTimeout(() => {
        scrollToElement(analysisRef);
      }, 500);

      // Automatically search for hospitals if location is available
      if (hasLocation && analysisData?.hospitalType) {
        setTimeout(async () => {
          await handleSearchHospitals(analysisData.hospitalType);
        }, 2000);
      }
    } else if (analysisError) {
      showMessage(analysisError, "error");
    }
  };

  // Handle hospital search
  const handleSearchHospitals = async (hospitalType = "") => {
    if (!hasLocation) {
      showMessage(
        "Please get your location first to find nearby hospitals.",
        "error"
      );
      return;
    }

    const success = await searchNearbyHospitals(lat, lng, hospitalType);
    if (success) {
      setCurrentStep(4);
      // Auto-scroll to hospitals section
      setTimeout(() => {
        scrollToElement(hospitalsRef);
      }, 500);
    } else if (hospitalsError) {
      showMessage(hospitalsError, "error");
    }
  };

  // Get location on component mount
  useEffect(() => {
    handleGetLocation();
  }, []);

  // Show analysis error messages
  useEffect(() => {
    if (analysisError) {
      showMessage(analysisError, "error");
    }
  }, [analysisError]);

  // Show hospitals error messages
  useEffect(() => {
    if (hospitalsError) {
      showMessage(hospitalsError, "error");
    }
  }, [hospitalsError]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
            padding: "30px",
          }}
        >
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "900",
              color: "white",
              textShadow: "3px 3px 6px rgba(0,0,0,0.3)",
              marginBottom: "15px",
              letterSpacing: "-1px",
            }}
          >
            🩺 AI Health Assistant
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.95)",
              fontSize: "1.3rem",
              fontWeight: "400",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Your intelligent healthcare companion for symptom analysis and
            medical guidance
          </p>
        </div>

        {/* Message Display */}
        <MessageDisplay message={message} />

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} />
        <StepLabels currentStep={currentStep} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
            gap: "30px",
          }}
        >
          {/* Input Section */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.98)",
              padding: "40px",
              borderRadius: "25px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
              backdropFilter: "blur(15px)",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "all 0.3s ease",
            }}
          >
            <h2
              style={{
                fontSize: "2.2rem",
                fontWeight: "700",
                marginBottom: "30px",
                color: "#2d3748",
                textAlign: "center",
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {currentStep === 1 && "Step 1: Get Your Location"}
              {currentStep === 2 && "Step 2: Describe Symptoms"}
              {currentStep === 3 && "Step 3: AI Analysis"}
              {currentStep === 4 && "Step 4: Find Hospitals"}
            </h2>

            <LocationInput
              lat={lat}
              lng={lng}
              address={address}
              onGetLocation={handleGetLocation}
            />

            <FileUpload
              file={file}
              onFileChange={(e) => setFile(e.target.files[0])}
            />

            <SymptomsInput
              symptoms={symptoms}
              onSymptomsChange={(e) => setSymptoms(e.target.value)}
            />

            <button
              onClick={handleAnalyze}
              disabled={loading || (!symptoms.trim() && !file)}
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: loading ? "#a0aec0" : "#667eea",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                border: "none",
                borderRadius: "12px",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                position: "relative",
              }}
              onMouseOver={(e) =>
                !loading && (e.target.style.backgroundColor = "#5a67d8")
              }
              onMouseOut={(e) =>
                !loading && (e.target.style.backgroundColor = "#667eea")
              }
            >
              {loading ? "🔄 Analyzing..." : "🔍 Analyze with AI"}
            </button>
          </div>

          {/* Analysis Results Section */}
          {showAnalysis && hasAnalysis && (
            <div ref={analysisRef}>
              <AnalysisResults
                analysisData={analysisData}
                onSearchHospitals={handleSearchHospitals}
              />
            </div>
          )}
        </div>

        {/* Hospitals Section */}
        {hasHospitals && (
          <div ref={hospitalsRef}>
            <HospitalsList
              hospitals={hospitals}
              loadingHospitals={loadingHospitals}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
