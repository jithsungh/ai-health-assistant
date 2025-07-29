// server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const axios = require('axios');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

const API_KEY = 'AIzaSyBkHqR11h99b_P03DIED7fDXuC_bRGgBug'; // 🔴 Replace with your actual key

// Symptom analysis
function analyzeSymptoms(symptoms) {
  const symptomText = symptoms.toLowerCase();
  const detected = [];

  if (symptomText.includes('fever')) detected.push('fever');
  if (symptomText.includes('cold')) detected.push('cold');
  if (symptomText.includes('cough')) detected.push('cough');
  if (symptomText.includes('headache')) detected.push('headache');

  return detected;
}

// Diet suggestion
function getDietPlan(symptoms) {
  if (symptoms.includes('fever')) return 'Drink plenty of fluids, rest, and eat easily digestible food.';
  if (symptoms.includes('cold')) return 'Drink hot water, herbal tea, and eat vitamin C-rich fruits.';
  if (symptoms.includes('cough')) return 'Avoid cold drinks, consume honey and ginger.';
  if (symptoms.includes('headache')) return 'Stay hydrated, rest in a quiet room, and avoid screen time.';
  return 'Maintain a balanced diet and stay hydrated.';
}

// Analyze symptoms route
app.post('/analyze', upload.single('file'), async (req, res) => {
  try {
    let symptoms = req.body.symptoms || '';

    if (req.file) {
      const dataBuffer = fs.readFileSync(req.file.path);
      const pdfData = await pdfParse(dataBuffer);
      symptoms += ' ' + pdfData.text;
      fs.unlinkSync(req.file.path); // Cleanup
    }

    const detectedSymptoms = analyzeSymptoms(symptoms);
    const dietPlan = getDietPlan(detectedSymptoms.join(' '));

    res.json({ symptoms: detectedSymptoms.join(', '), diet: dietPlan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error analyzing symptoms' });
  }
});

// Geocoding route
app.post('/get-address', async (req, res) => {
  const { lat, lng } = req.body;
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
    );
    const address = response.data.results[0]?.formatted_address || 'Address not found';
    res.json({ address });
  } catch (err) {
    console.error(err);
    res.status(500).json({ address: 'Address not found' });
  }
});

// Nearby hospitals route
app.post('/nearby-hospitals', async (req, res) => {
  const { lat, lng } = req.body;
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=30000&type=hospital&key=${API_KEY}`
    );
    console.log(response.data);
    const hospitals = response.data.results.slice(0, 5).map(place => ({
      name: place.name,
      address: place.vicinity,
      place_id: place.place_id,
      rating: place.rating || 'N/A'
    }));
    res.json({ hospitals });
  } catch (err) {
    console.error(err);
    res.status(500).json({ hospitals: [] });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 