// controllers/locationController.js
const HospitalService = require("../services/hospitalService");

class LocationController {
  constructor(googleMapsApiKey) {
    this.hospitalService = new HospitalService(googleMapsApiKey);
  }

  async getAddress(req, res) {
    try {
      const { lat, lng } = req.body;

      if (!lat || !lng) {
        return res
          .status(400)
          .json({ error: "Latitude and longitude are required" });
      }

      const address = await this.hospitalService.getAddressFromCoordinates(
        lat,
        lng
      );
      res.json({ address });
    } catch (error) {
      console.error("Error getting address:", error);
      res.status(500).json({ address: "Address not found" });
    }
  }

  async getNearbyHospitals(req, res) {
    try {
      const { lat, lng, hospitalType } = req.body;

      if (!lat || !lng) {
        return res
          .status(400)
          .json({ error: "Latitude and longitude are required" });
      }

      const hospitals = await this.hospitalService.findNearbyHospitals(
        lat,
        lng,
        hospitalType
      );
      res.json(hospitals);
    } catch (error) {
      console.error("Error finding nearby hospitals:", error);
      res.status(500).json([]);
    }
  }
}

module.exports = LocationController;
