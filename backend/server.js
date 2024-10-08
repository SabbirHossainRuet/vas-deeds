// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const deedRoutes = require('./routes/deedRoutes');
const fs = require('fs');
const { google } = require('googleapis');
const cors = require('cors'); // Import CORS middleware

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors()); // Use CORS middleware
app.use(express.json());
app.use('/api/deeds', deedRoutes);

// OAuth 2.0 configuration
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const credentials = require('./config/credentials.json');

// Destructure client_id, client_secret, and redirect_uris
const { client_id, client_secret, redirect_uris } = credentials.web; // Change to web
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Generate an authentication URL
const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
});

// OAuth callback route
app.get('/oauth2callback', async (req, res) => {
    const code = req.query.code;
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // Save tokens for later use
    fs.writeFileSync('token.json', JSON.stringify(tokens));

    res.send('Authorization successful! You can close this tab.');
});

// Redirect the user to the auth URL when starting the app
app.get('/auth', (req, res) => {
    res.redirect(authUrl);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



