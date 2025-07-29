// services/hospitalService.js
const axios = require("axios");

class HospitalService {
  constructor(googleMapsApiKey) {
    this.googleMapsApiKey = googleMapsApiKey;
  }

  async findNearbyHospitals(lat, lng, hospitalType = "") {
    try {
      // Create search query based on hospital type
      let searchQuery = "hospital";
      if (hospitalType) {
        // Clean and format the hospital type for search
        const cleanType = hospitalType
          .toLowerCase()
          .replace(/hospitals?/gi, "")
          .replace(/clinic/gi, "")
          .replace(/care/gi, "")
          .trim();

        if (cleanType) {
          searchQuery = `${cleanType} hospital`;
        }
      }

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=30000&keyword=${encodeURIComponent(
          searchQuery
        )}&type=hospital&key=${this.googleMapsApiKey}`
      );

      console.log(`Searching for: ${searchQuery}`, response.data);

      const hospitals = response.data.results.slice(0, 5).map((place) => ({
        name: place.name,
        vicinity: place.vicinity,
        place_id: place.place_id,
        rating: place.rating || "N/A",
        opening_hours: place.opening_hours,
        formatted_phone_number: place.formatted_phone_number,
        geometry: place.geometry,
      }));

      return hospitals;
    } catch (error) {
      console.error("Error finding hospitals:", error);
      throw error;
    }
  }

  async getAddressFromCoordinates(lat, lng) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.googleMapsApiKey}`
      );

      const address =
        response.data.results[0]?.formatted_address || "Address not found";
      return address;
    } catch (error) {
      console.error("Error getting address:", error);
      throw error;
    }
  }
}

module.exports = HospitalService;
