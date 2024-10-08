const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const TOKEN_PATH = path.join(__dirname, 'token.json');
const credentials = require('./credentials.json');

const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Load previously authorized token from a file
fs.readFile(TOKEN_PATH, (err, token) => {
  if (err) {
    console.error('Error loading token.json:', err);
    return;
  }
  oAuth2Client.setCredentials(JSON.parse(token));
});

const drive = google.drive({
  version: 'v3',
  auth: oAuth2Client,
});

module.exports = { oAuth2Client, drive };
