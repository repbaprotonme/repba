// Import the Google Sheets API
const googleSheets = require('google-sheets');

// Create a new Google Sheets client
const client = new googleSheets();

// Get the OAuth 2.0 client ID and secret from the Google Cloud Platform Console
const clientId = '';
const clientSecret = '';

// Create an OAuth 2.0 authentication object
const auth = new google.auth.OAuth2(clientId, clientSecret);

// Authorize the client
auth.authorize(async (err, authResult) => {
  // If there was an error, handle it
  if (err) {
    console.log(err);
    return;
  }

  // Save the auth result
  client.setAuth(authResult);

  // Create a new Google Sheet
  const sheet = client.create('My New Sheet');

  // Set the sheet's title
  sheet.setTitle('My New Sheet');

  // Add a new row to the sheet
  const row = sheet.appendRow([
    'This is a new row',
    'This is a cell in the row',
  ]);

  // Save the sheet
  sheet.save();
});


























