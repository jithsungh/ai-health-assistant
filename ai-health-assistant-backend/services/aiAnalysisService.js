// services/aiAnalysisService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const GeminiAPIManager = require("../config/geminiConfig");

class AIAnalysisService {
  constructor() {
    this.geminiManager = new GeminiAPIManager();
  }

  async analyzeSymptoms(symptoms, fileData = null) {
    try {
      const apiKey = this.geminiManager.getNextAPIKey();
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      let prompt = `You are a medical AI assistant. Analyze the following symptoms and provide a structured response in JSON format.

Based on the symptoms provided, return a JSON object with the following fields:
- detectedSymptoms: A clear summary of the symptoms
- hospitalType: The most appropriate type of hospital/specialist (e.g., "General Medicine", "Cardiology", "Emergency", "Orthopedics", etc.)
- possible-reasons: Possible medical reasons for these symptoms
- dietPlan: An array of dietary recommendations
- severity: "Low", "Medium", or "High"
- urgency: "Routine", "Urgent", or "Emergency"

Symptoms: ${symptoms}`;

      let result;
      if (fileData) {
        // For file analysis with multimodal input
        result = await model.generateContent([
          prompt,
          {
            inlineData: {
              data: fileData.buffer.toString("base64"),
              mimeType: fileData.mimetype,
            },
          },
        ]);
      } else {
        // For text-only analysis
        result = await model.generateContent(prompt);
      }

      const response = await result.response;
      const text = response.text();

      // Try to parse JSON from response
      let analysisData;
      try {
        // Clean the response text to extract JSON
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          analysisData = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("No JSON found in response");
        }
      } catch (parseError) {
        console.log("JSON parsing failed, using fallback analysis");
        analysisData = this.getFallbackAnalysis(symptoms);
      }

      return analysisData;
    } catch (error) {
      console.error("AI Analysis Error:", error);
      return this.getFallbackAnalysis(symptoms);
    }
  }

  getFallbackAnalysis(symptoms) {
    const commonSymptoms = symptoms.toLowerCase();
    let hospitalType = "General Medicine";
    let severity = "Low";
    let urgency = "Routine";
    let possibleReasons =
      "Common symptoms that may require basic medical evaluation.";

    // Basic symptom analysis
    if (
      commonSymptoms.includes("chest pain") ||
      commonSymptoms.includes("heart")
    ) {
      hospitalType = "Cardiology";
      severity = "High";
      urgency = "Urgent";
      possibleReasons =
        "Chest pain could indicate cardiovascular issues and requires immediate medical attention.";
    } else if (
      commonSymptoms.includes("fever") &&
      commonSymptoms.includes("severe")
    ) {
      hospitalType = "Emergency";
      severity = "Medium";
      urgency = "Urgent";
      possibleReasons =
        "High fever may indicate infection or other conditions requiring prompt treatment.";
    } else if (
      commonSymptoms.includes("headache") ||
      commonSymptoms.includes("migraine")
    ) {
      hospitalType = "Neurology";
      severity = "Low";
      urgency = "Routine";
      possibleReasons =
        "Headaches can have various causes from stress to neurological conditions.";
    }

    return {
      detectedSymptoms: symptoms,
      hospitalType,
      "possible-reasons": possibleReasons,
      dietPlan: [
        "Stay hydrated with plenty of water",
        "Eat light, easily digestible foods",
        "Include fruits and vegetables rich in vitamins",
        "Avoid processed and high-fat foods",
        "Get adequate rest",
      ],
      severity,
      urgency,
    };
  }
}

module.exports = AIAnalysisService;
