# Airtable Form Submission Backend

This is a Node.js backend service that enables form submissions from a React frontend to be securely stored in an Airtable database. It uses Express.js to handle API requests and Axios for interacting with Airtable's REST API.

---

## Features

- Accepts form data (name, email, subject, comment) via a `/submit` POST route.
- Validates incoming data to ensure all required fields are present.
- Sends validated data to an Airtable table using its REST API.
- Handles errors gracefully, returning meaningful error messages for debugging.
- Deployable to cloud hosting services like Render, Vercel, or Heroku.

---

## Getting Started

Follow these steps to set up and run the backend locally:

### Prerequisites

- Node.js installed on your machine.
- An Airtable account with a base and table configured to accept form data.
- Airtable **Personal Access Token (PAT)** and **Base URL**.

---

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following environment variables:
   ```env
   AIRTABLE_BASE_URL=https://api.airtable.com/v0/YOUR_BASE_ID/YOUR_TABLE_NAME
   AIRTABLE_PAT=your_personal_access_token
   ```

4. Start the server:
   ```bash
   node index.js
   ```
   The server will run on `http://localhost:5000`.

---

## API Endpoints

### POST `/submit`

#### Request

- **URL:** `/submit`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "subject": "Feedback",
    "comment": "This is a test comment."
  }
  ```

#### Response

- **Success:** 
  ```json
  {
    "success": true,
    "data": {
      "id": "recXXXXXXXXXX",
      "fields": {
        "Name": "John Doe",
        "Email": "johndoe@example.com",
        "Subject": "Feedback",
        "Comment": "This is a test comment."
      }
    }
  }
  ```
- **Error:**
  ```json
  {
    "success": false,
    "error": "All fields are required."
  }
  ```

---

## Deployment

1. **Hosting Service:** Deploy on Render, Heroku, or any Node.js-supported hosting platform.
2. **Set Environment Variables:** Add `AIRTABLE_BASE_URL` and `AIRTABLE_PAT` in the hosting service's environment variables settings.
3. **Start the Service:** The app will be deployed to the hosting service's URL (e.g., `https://your-backend.onrender.com`).

---

## Dependencies

- [Express](https://expressjs.com/) - Web framework for Node.js.
- [Axios](https://axios-http.com/) - Promise-based HTTP client for API requests.
- [dotenv](https://github.com/motdotla/dotenv) - For managing environment variables.

---

## Testing

### Using Postman

1. Start the server locally (`node index.js`).
2. Open Postman and send a POST request to:
   ```
   http://localhost:5000/submit
   ```
3. Use the sample body:
   ```json
   {
     "name": "John Doe",
     "email": "johndoe@example.com",
     "subject": "Feedback",
     "comment": "This is a test comment."
   }
   ```

### Common Issues
- **Error 400:** Ensure all fields are provided.
- **Error 500:** Check Airtable URL and PAT in `.env`.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- [Airtable API Documentation](https://airtable.com/api)
- [Render Hosting Service](https://render.com/)
- [Airtable API Tutorial | For Beginners](https://youtu.be/ncuVAqfNvAM)
```

### Next Steps
1. Replace placeholders (like `https://github.com/yourusername/your-repo-name.git`, `YOUR_BASE_ID`, `your_personal_access_token`) with actual values before uploading.
2. Include a `LICENSE` file if you want to define licensing explicitly. 

Let me know if you'd like more adjustments!