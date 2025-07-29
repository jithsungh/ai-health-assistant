// src/hooks/useHealthAnalysis.js
import { useState, useCallback } from "react";
import { healthAPI } from "../services/api";

export const useHealthAnalysis = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeSymptoms = useCallback(async (symptoms) => {
    if (!symptoms.trim()) {
      setError("Please enter symptoms to analyze.");
      return false;
    }

    setLoading(true);
    setError("");
    setAnalysisData(null);

    try {
      const result = await healthAPI.analyzeSymptoms(symptoms);
      setAnalysisData(result);
      return true;
    } catch (analysisError) {
      console.error("Analysis error:", analysisError);
      setError(
        analysisError.message || "Failed to analyze symptoms. Please try again."
      );
      setAnalysisData({
        error: analysisError.message || "Analysis failed. Please try again.",
        symptoms: "",
        hospitalType: "",
        "possible-reasons": "",
        dietPlan: "",
        severity: "",
        urgency: "",
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearAnalysis = useCallback(() => {
    setAnalysisData(null);
    setError("");
    setLoading(false);
  }, []);

  return {
    analysisData,
    loading,
    error,
    analyzeSymptoms,
    clearAnalysis,
    hasAnalysis: analysisData !== null,
  };
};

export default useHealthAnalysis;
