require("dotenv").config(); // Load environment variables
const express = require("express");
const axios = require("axios");
const cors = require("cors"); // CORS for frontend compatibility

const app = express();
const PORT = 5000;

// Enable CORS for your frontend
app.use(
  cors({
    origin: "https://themaryanjuguna.github.io", // Allow only your frontend
    methods: ["POST", "GET", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// Main POST route
app.post("/", async (req, res) => {
  try {
    // Log incoming payload
    const { name, email, subject, comment } = req.body;

    // Validate incoming data
    if (!name || !email || !subject || !comment) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required." });
    }

    // Airtable API details
    const airtableBaseUrl = process.env.AIRTABLE_BASE_URL; // Airtable API endpoint
    const airtablePat = `Bearer ${process.env.AIRTABLE_PAT}`; // Airtable PAT

    if (!airtableBaseUrl || !process.env.AIRTABLE_PAT) {
      throw new Error("Airtable configuration is missing. Check your .env file.");
    }

    // Submit data to Airtable
    const airtableResponse = await axios.post(
      airtableBaseUrl,
      {
        fields: {
          name: name,
          email: email,
          subject: subject,
          comment: comment,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${airtablePat}`, // Ensure the token is prefixed with "Bearer"
          "Content-Type": "application/json", 
          "Access-Control-Allow-Origin": "https://themaryanjuguna.github.io", // This can be added if you're configuring CORS on the server
      },
      }
    );

    // Respond with success
    res.json({ success: true, data: airtableResponse.data });
  } catch (error) {
    // Log and handle errors
    console.error("Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    res.status(500).json({ success: false, error: "Submission failed." });
  }
});

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);