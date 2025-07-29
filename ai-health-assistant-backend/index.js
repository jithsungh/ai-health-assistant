const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");

const app = express();
const port = 5000;

// Use multer memory storage for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors());
app.use(express.json()); // for parsing application/json

app.post("/analyze", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const text = req.body.text;

    if (!file && !text) {
      return res.status(400).json({ error: "No input provided." });
    }

    let extractedText = "";

    if (file) {
      const dataBuffer = file.buffer;
      const parsedData = await pdfParse(dataBuffer);
      extractedText = parsedData.text;
    } else if (text) {
      extractedText = text;
    }

    // Simulated analysis
    const analysis = `Based on your report: ${extractedText.slice(0, 100)}...`;
    const diet = `Suggested diet based on symptoms:\n• Drink more water\n• Eat fruits and vegetables\n• Avoid junk food`;

    res.json({ analysis, diet });
  } catch (error) {
    console.error("Error during analysis:", error);
    res.status(500).json({ error: "Failed to analyze input" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
