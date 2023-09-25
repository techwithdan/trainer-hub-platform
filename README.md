TRAINER HUB PLATFORM

Serves the trainer hub APIs

Install requirements

- yarn
- nvm using node 18.16.0

Install dependencies

- yarn install

functional requirements

- search trainers
- list of trainers with pagination
- get a specific trainer
- create a trainer
- search pokemon
- list of pokemon with pagination
- get a specific pokemon
- search by type
- search by weakness

FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 setup

// Read the service account key JSON file
const serviceAccountKey = require('./path-to-your-service-account-key.json');

// Convert JSON to a single-line string
const jsonString = JSON.stringify(serviceAccountKey);

// Base64-encode the JSON string
const base64EncodedKey = Buffer.from(jsonString).toString('base64');

console.log(base64EncodedKey);

// Set the output to the env key
