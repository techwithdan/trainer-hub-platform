import { Trainer } from "src/types/trainer/trainer";
import { firebase_admin } from "../../firebaseApp";
import { FirebaseAuthError } from "src/types/firebase/auth_error";
import { EMAIL_ALREADY_EXISTS, INTERNAL_ERROR } from "./const";
import { createGlobalError } from "../global";
const firebase_auth = firebase_admin.auth();
const firestore = firebase_admin.firestore();
const trainers_collection = firestore.collection("trainers");

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
const birthday_check = (birthday: string): boolean => {
  if (Number(birthday.slice(0, 2)) > 12 || Number(birthday.slice(0, 1)) < 0) {
    return false;
  }
  if (Number(birthday.slice(3, 5)) > 31 || Number(birthday.slice(3, 4)) < 0) {
    return false;
  }
  if (Number(birthday.slice(6, 10)) < 0) {
    return false;
  }
  return true;
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
    if (typeof age !== "number") {
      throw createGlobalError(406, "age must be a number");
    }
    if (!birthday_check(birthday)) {
      throw createGlobalError(
        406,
        "date format should be as follows mm/dd/yyyy"
      );
    }
  }

  // create an auth
  try {
    const { uid } = await firebase_auth.createUser({
      email,
      password,
    });
    const doc_data = {
      name,
      age,
      birthday,
      id: uid,
      badges: 0,
      pokemon_party: [],
    };

    const res = await trainers_collection.doc(uid).create(doc_data);

    return doc_data;
  } catch (error) {
    throw createGlobalError(500, "Internal server error");
  }
}
