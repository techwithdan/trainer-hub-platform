import { Pokemon } from "src/types/pokemon/pokemon";
import pokemon_db from "./pokemon_db.json";
import { firebase_admin } from "../../firebaseApp";
const list_of_pokemon: Pokemon[] = pokemon_db;
const firestore = firebase_admin.firestore();
const pokedex_collection = firestore.collection("pokedex");
function getRandomPokemon(): Pokemon {
  return list_of_pokemon[Math.floor(Math.random() * list_of_pokemon.length)];
}

export async function getPokemonByFilter({
  type = "",
  weaknesses = "",
  limit = 5,
}: {
  type?: string;
  weaknesses?: string;
  limit?: number;
}): Promise<Pokemon[]> {
  if (type && weaknesses)
    return list_of_pokemon.filter(
      (pokemon) =>
        pokemon.type.toLowerCase().includes(type.toLowerCase()) &&
        pokemon.weaknesses.hasOwnProperty(weaknesses)
    );

  if (type)
    return list_of_pokemon.filter((pokemon) =>
      pokemon.type.toLowerCase().includes(type.toLowerCase())
    );

  if (weaknesses)
    return list_of_pokemon.filter((pokemon) =>
      pokemon.weaknesses.hasOwnProperty(weaknesses)
    );

  return [getRandomPokemon()];
}

export async function getPokemonById(id: string): Promise<Pokemon | undefined> {
  let pokemon: Pokemon | undefined;
  const pokemon_ref = await pokedex_collection.doc(id).get();
  if (!pokemon_ref.exists) return pokemon;
  pokemon = pokemon_ref.data() as Pokemon;
  return pokemon;
}
