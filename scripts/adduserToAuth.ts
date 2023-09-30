import { firebase_admin } from "../src/firebaseApp";
const firebase_auth = firebase_admin.auth();

async function addUserToAuth(): Promise<void> {
  try {
    const new_user = await firebase_auth.createUser({
      email: "sampleUser@gmail.com",
      password: "abc123EFG",
    });
    console.log(new_user.email);
  } catch (error) {
    console.error({ error });
    // errorInfo.code
  }
}

addUserToAuth();
