import { Trainer } from "src/types/trainer/trainer";
import { firebase_admin } from "../../firebaseApp";
import { FirebaseAuthError } from "src/types/firebase/auth_error";
import { EMAIL_ALREADY_EXISTS, INTERNAL_ERROR } from "./const";
import { createGlobalError } from "../global";
const firebase_auth = firebase_admin.auth();

const trainer: Trainer = {
  id: "1",
  name: "Dan",
  age: 31,
  birthday: "02/15/1992",
  badges: 8,
  email: "dan@bigpenis.com",
  pokemon_party: [
    {
      id: 1,
      name: "Dragonite",
      type: "Dragon",
      weakness: { ice: 2, dragon: 2 },
    },
  ],
};

export function getTrainerById(id: string): Trainer {
  return trainer;
}

export async function createNewTrainer({
  age,
  name,
  birthday,
  email,
  password,
}: {
  age: number;
  name: string;
  birthday: string;
  email: string;
  password: string;
}): Promise<Trainer> {
  // look up auth by email
  try {
    const email_exists = await firebase_auth.getUserByEmail(email);

    if (email_exists) {
      throw { code: EMAIL_ALREADY_EXISTS };
    }
  } catch (error) {
    const { code = "", message = "" } = error as FirebaseAuthError;

    if (code === EMAIL_ALREADY_EXISTS) {
      throw createGlobalError(409, "Email already exists");
    }

    if (code === INTERNAL_ERROR) {
      throw createGlobalError(500, "Internal server error");
    }
  }

  // create an auth
  try {
    const { uid } = await firebase_auth.createUser({
      email,
      password,
    });

    // Add the new trainer into trainer collection
    // set the doc id as the uid from auth
    // set Trainer interface properties as the trainer fields

    return {
      id: uid,
      name,
      age,
      email,
      birthday,
      pokemon_party: [],
      badges: 0,
    };
  } catch (error) {
    throw createGlobalError(500, "Internal server error");
  }
}
