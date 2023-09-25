import { firebase_admin } from "../src/firebaseApp";
const firestore = firebase_admin.firestore();

async function searchFS(): Promise<void> {
  const collection_ref = firestore.collection("pokedex");
  const startAtRes = await collection_ref
    .orderBy("type")
    .startAt("Grass/Poison")
    .limit(5)
    .get();
  startAtRes.forEach((res) => {
    console.log(res.data());
  });
  console.log("Done");
}

// searchFS();
