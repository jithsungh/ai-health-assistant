import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [symptoms, setSymptoms] = useState('');
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState('');
  const [diet, setDiet] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [address, setAddress] = useState('');
  const [hospitals, setHospitals] = useState([]);

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLat(latitude);
      setLng(longitude);

      try {
        const res = await axios.post('http://localhost:5000/get-address', { lat: latitude, lng: longitude });
        setAddress(res.data.address);
      } catch {
        setAddress('Address not found');
      }

      try {
        const hosp = await axios.post('http://localhost:5000/nearby-hospitals', { lat: latitude, lng: longitude });
        setHospitals(hosp.data.hospitals);
      } catch {
        setHospitals([]);
      }
    }, () => {
      alert('Location access denied');
    });
  };

  const handleCheck = async () => {
    const formData = new FormData();
    formData.append('symptoms', symptoms);
    if (file) formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/analyze', formData);
      setAnalysis(res.data.symptoms);
      setDiet(res.data.diet);
    } catch {
      setAnalysis('Error analyzing symptoms');
      setDiet('');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #e0f7fa, #e0ffe0)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        background: 'white',
        padding: '30px',
        borderRadius: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#00695c',
          textAlign: 'center'
        }}>
          🩺 <span style={{ color: '#00695c' }}>AI Health Symptom Checker</span>
        </h1>

        <button onClick={handleLocation} style={{
          width: '100%',
          backgroundColor: '#00c853',
          color: 'white',
          padding: '12px',
          fontSize: '16px',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '12px',
          marginBottom: '10px',
          cursor: 'pointer'
        }}>
          📍 Locate Me
        </button>

        <p>📌 <strong>Location:</strong> {address}</p>
        <p>📍 <strong>Coordinates:</strong> {lat && lng ? `${lat}, ${lng}` : ''}</p>

        <div style={{ marginTop: '10px' }}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{
              backgroundColor: '#c8f7d3',
              padding: '6px',
              borderRadius: '10px',
              border: 'none',
              fontWeight: 'bold',
              marginRight: '10px'
            }}
          />
        </div>

        <textarea
          placeholder="Enter your symptoms here..."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          style={{
            width: '100%',
            marginTop: '10px',
            height: '100px',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            resize: 'none'
          }}
        />

        <button onClick={handleCheck} style={{
          width: '100%',
          marginTop: '15px',
          padding: '12px',
          backgroundColor: '#00b0ff',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer'
        }}>
          🔍 Check with AI
        </button>

        <div style={{
          backgroundColor: '#e8fff0',
          marginTop: '25px',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #b2dfdb'
        }}>
          <h3 style={{ color: '#00796b', marginBottom: '10px' }}>
            📄 <strong>Analysis</strong>
          </h3>
          <p><strong>Detected symptoms:</strong> {analysis}</p>
        </div>

        <div style={{
          backgroundColor: '#fff4e6',
          marginTop: '20px',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #ffcc80'
        }}>
          <h3 style={{ color: '#d84315', marginBottom: '10px' }}>
            🥗 <strong>Suggested Diet Plan</strong>
          </h3>
          <p>{diet}</p>
        </div>

        <div style={{
          backgroundColor: '#f3f4ff',
          marginTop: '20px',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #c5cae9'
        }}>
          <h3 style={{ color: '#3f51b5', marginBottom: '10px' }}>
            🏥 <strong>Nearby Hospitals</strong>
          </h3>
          {hospitals.length > 0 ? (
            hospitals.map((h, index) => (
              <div key={index} style={{ marginBottom: '15px' }}>
                <strong style={{ fontSize: '1rem' }}>{h.name}</strong><br />
                📍 <span>{h.address}</span><br />
                ⭐ <span>Rating: {h.rating}</span>
              </div>
            ))
          ) : (
            <p>No nearby hospitals found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
