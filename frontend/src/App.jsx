import React, { useState, useRef, useEffect } from "react";
import NavigationBar from "./components/common/NavigationBar";
import MessageDisplay from "./components/common/MessageDisplay";
import LocationInput from "./components/location/LocationInput";
import SymptomsInput from "./components/symptoms/SymptomsInput";
import AnalysisResults from "./components/analysis/AnalysisResults";
import HospitalsList from "./components/hospitals/HospitalsList";
import useLocation from "./hooks/useLocation";
import useHealthAnalysis from "./hooks/useHealthAnalysis";
import useHospitals from "./hooks/useHospitals";

function App() {
  const [symptoms, setSymptoms] = useState("");
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
    radius,
    searchNearbyHospitals,
    updateRadius,
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

  // Navigation functions
  const handleStepChange = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClear = () => {
    setSymptoms("");
    setCurrentStep(1);
    setShowAnalysis(false);
    setMessage({ text: "", type: "" });
    // Clear all hook states
    // Note: You might want to add clear functions to your hooks
  };

  const canGoBack = currentStep > 1;

  // Handle symptom analysis
  const handleAnalyze = async () => {
    const success = await analyzeSymptoms(symptoms);
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
  const handleSearchHospitals = async (
    hospitalType = "",
    searchRadius = radius
  ) => {
    if (!hasLocation) {
      showMessage(
        "Please get your location first to find nearby hospitals.",
        "error"
      );
      return;
    }

    const success = await searchNearbyHospitals(
      lat,
      lng,
      hospitalType,
      searchRadius
    );
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

        {/* Navigation Bar */}
        <NavigationBar
          currentStep={currentStep}
          onStepChange={handleStepChange}
          onBack={handleBack}
          onClear={handleClear}
          canGoBack={canGoBack}
        />

        {/* Page Content */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.98)",
            padding: "40px",
            borderRadius: "25px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            backdropFilter: "blur(15px)",
            border: "1px solid rgba(255,255,255,0.2)",
            transition: "all 0.3s ease",
            minHeight: "500px",
            animation: "fadeIn 0.5s ease-in-out",
          }}
        >
          {/* Step 1: Location */}
          {currentStep === 1 && (
            <div style={{ animation: "slideIn 0.5s ease-out" }}>
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
                📍 Step 1: Get Your Location
              </h2>
              <LocationInput
                lat={lat}
                lng={lng}
                address={address}
                onGetLocation={handleGetLocation}
                isGettingLocation={isGettingLocation}
                locationError={locationError}
              />
            </div>
          )}

          {/* Step 2: Symptoms */}
          {currentStep === 2 && (
            <div style={{ animation: "slideIn 0.5s ease-out" }}>
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
                📝 Step 2: Describe Your Symptoms
              </h2>
              <SymptomsInput
                symptoms={symptoms}
                onSymptomsChange={(e) => setSymptoms(e.target.value)}
              />
              <button
                onClick={handleAnalyze}
                disabled={loading || !symptoms.trim()}
                style={{
                  width: "100%",
                  padding: "18px",
                  backgroundColor: loading ? "#a0aec0" : "#667eea",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "700",
                  border: "none",
                  borderRadius: "16px",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  position: "relative",
                  marginTop: "20px",
                  boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
                }}
                onMouseOver={(e) =>
                  !loading && (e.target.style.backgroundColor = "#5a67d8")
                }
                onMouseOut={(e) =>
                  !loading && (e.target.style.backgroundColor = "#667eea")
                }
              >
                {loading
                  ? "🔄 Analyzing Your Symptoms..."
                  : "🔍 Analyze with AI"}
              </button>
            </div>
          )}

          {/* Step 3: Analysis Results */}
          {currentStep === 3 && (
            <div
              style={{ animation: "slideIn 0.5s ease-out" }}
              ref={analysisRef}
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
                🔍 Step 3: AI Analysis Results
              </h2>
              {hasAnalysis ? (
                <AnalysisResults
                  analysisData={analysisData}
                  onSearchHospitals={handleSearchHospitals}
                />
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 20px",
                    color: "#718096",
                  }}
                >
                  <div style={{ fontSize: "64px", marginBottom: "20px" }}>
                    🤖
                  </div>
                  <p style={{ fontSize: "18px", margin: "0" }}>
                    Complete symptom analysis to see results here
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Hospitals */}
          {currentStep === 4 && (
            <div
              style={{ animation: "slideIn 0.5s ease-out" }}
              ref={hospitalsRef}
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
                🏥 Step 4: Find Nearby Hospitals
              </h2>
              <HospitalsList
                hospitals={hospitals}
                loadingHospitals={loadingHospitals}
                radius={radius}
                onRadiusChange={updateRadius}
                onSearchHospitals={handleSearchHospitals}
                hospitalType={analysisData?.hospitalType || ""}
              />
            </div>
          )}
        </div>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
}

export default App;
