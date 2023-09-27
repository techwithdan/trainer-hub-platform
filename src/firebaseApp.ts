import admin, { credential, ServiceAccount } from "firebase-admin";
import * as dotenv from "dotenv";
dotenv.config();

const base64_encoded_key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64;

if (!base64_encoded_key) {
  throw new Error(
    "FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 is not defined in the environment variables."
  );
}

const json_string = Buffer.from(base64_encoded_key, "base64").toString("utf-8");
const service_account = JSON.parse(json_string);

const firebase_admin = admin.initializeApp({
  credential: credential.cert(service_account as ServiceAccount),
});

export { firebase_admin };
