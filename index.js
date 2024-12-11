require("dotenv").config(); // Load environment variables
const express = require("express");
const axios = require("axios");
const cors = require("cors"); // CORS for frontend compatibility
const app = express();
const PORT = 5000;

app.use(express.json()); // Middleware to parse JSON requests
app.use(cors()); // Enable CORS for all routes
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post("/submit", async (req, res) => {
  try {
    const { name, email, subject, comment } = req.body;

    // Validate incoming data
    if (!name || !email || !subject || !comment) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required." });
    }

    // Airtable API details
    const airtableBaseUrl = process.env.AIRTABLE_BASE_URL;
    const airtablePat = `Bearer ${process.env.AIRTABLE_PAT}`;

    if (!airtableBaseUrl || !process.env.AIRTABLE_PAT) {
      throw new Error("Airtable configuration is missing. Check your .env file.");
    }

    // Submit data to Airtable
    const airtableResponse = await axios.post(
      `${airtableBaseUrl}`,
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
          Authorization: `Bearer ${airtablePat}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Respond with success
    res.json({ success: true, data: airtableResponse.data });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({ success: false, error: "Submission failed." });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);