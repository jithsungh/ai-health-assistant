// src/hooks/useHospitals.js
import { useState, useCallback } from "react";
import { healthAPI } from "../services/api";

export const useHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const [hospitalsError, setHospitalsError] = useState("");

  const searchNearbyHospitals = useCallback(
    async (lat, lng, hospitalType = "") => {
      if (!lat || !lng) {
        setHospitalsError("Location is required to find nearby hospitals");
        return false;
      }

      setLoadingHospitals(true);
      setHospitalsError("");

      try {
        const result = await healthAPI.findNearbyHospitals(
          lat,
          lng,
          hospitalType
        );
        setHospitals(result || []);
        return true;
      } catch (error) {
        console.error("Error searching hospitals:", error);
        setHospitalsError(error.message || "Failed to find nearby hospitals");
        setHospitals([]);
        return false;
      } finally {
        setLoadingHospitals(false);
      }
    },
    []
  );

  const clearHospitals = useCallback(() => {
    setHospitals([]);
    setHospitalsError("");
    setLoadingHospitals(false);
  }, []);

  return {
    hospitals,
    loadingHospitals,
    hospitalsError,
    searchNearbyHospitals,
    clearHospitals,
    hasHospitals: hospitals.length > 0,
  };
};

export default useHospitals;
