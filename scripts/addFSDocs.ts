import { firebase_admin } from "../src/firebaseApp";
import gen1_pokemon from "../gen1_pokemon_with_weakness.json";
const firestore = firebase_admin.firestore();

async function getDoc(): Promise<void> {
  const collection_ref = firestore.collection("pokedex");
  // await Promise.all(
  //   gen1_pokemon.map((pokemon) => {
  //     const { id, type, name }: { id: string; type: string; name: string } =
  //       pokemon;
  //     collection_ref.doc(id).create({
  //       ...pokemon,
  //       type: type.toLowerCase(),
  //       name: name.toLowerCase(),
  //     });
  //   })
  // );
  console.log("Done");
}

// getDoc();
