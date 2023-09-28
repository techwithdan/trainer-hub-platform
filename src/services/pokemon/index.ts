import { Pokemon } from "src/types/pokemon/pokemon";
import pokemon_db from "./pokemon_db.json";
import { firebase_admin } from "../../firebaseApp";
const list_of_pokemon: Pokemon[] = pokemon_db;
const firestore = firebase_admin.firestore();
const pokedex_collection = firestore.collection("pokedex");
import axios from "axios";

async function getRandomPokemon(): Promise<Pokemon> {
  const index = Math.floor(Math.random() * list_of_pokemon.length);
  const { id } = list_of_pokemon[index];
  console.log(Number(id).toString());
  const {
    data: {
      sprites: {
        other: {
          "official-artwork": { front_default },
        },
      },
    },
  } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${Number(id).toString()}`
  );
  list_of_pokemon[index].img = front_default;
  return list_of_pokemon[index];
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
  if (type && weaknesses) {
    const filtered_type_and_weaknesses = list_of_pokemon.filter((pokemon) => {
      if (
        pokemon.type.toLowerCase().includes(type.toLowerCase()) &&
        pokemon.weaknesses.hasOwnProperty(weaknesses)
      ) {
        return pokemon;
      }
    });
    return Promise.all(
      filtered_type_and_weaknesses.map(async (pokemon) => {
        let poke_id = Number(pokemon.id).toString();
        const {
          data: {
            sprites: {
              other: {
                "official-artwork": { front_default },
              },
            },
          },
        } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${poke_id}`);
        return {
          ...pokemon,
          img: front_default,
        };
      })
    );
  }

  if (type) {
    const filtered_type = list_of_pokemon.filter((pokemon) => {
      if (pokemon.type.toLowerCase().includes(type.toLowerCase())) {
        return pokemon;
      }
    });
    return Promise.all(
      filtered_type.map(async (pokemon) => {
        let poke_id = Number(pokemon.id).toString();
        console.log({ poke_id, pokemon_id: pokemon.id });
        const {
          data: {
            sprites: {
              other: {
                "official-artwork": { front_default },
              },
            },
          },
        } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${poke_id}`);
        return {
          ...pokemon,
          img: front_default,
        };
      })
    );
  }

  if (weaknesses) {
    const filtered_weakness = list_of_pokemon.filter((pokemon) =>
      pokemon.weaknesses.hasOwnProperty(weaknesses)
    );
    return Promise.all(
      filtered_weakness.map(async (pokemon) => {
        let poke_id = Number(pokemon.id).toString();

        const {
          data: {
            sprites: {
              other: {
                "official-artwork": { front_default },
              },
            },
          },
        } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${poke_id}`);
        return {
          ...pokemon,
          img: front_default,
        };
      })
    );
  }

  return [await getRandomPokemon()];
}

export async function getPokemonById(id: string): Promise<Pokemon | undefined> {
  let pokemon: Pokemon | undefined;
  try {
    const pokemon_ref = await pokedex_collection.doc(id).get();
    if (!pokemon_ref.exists) {
      return undefined;
    }

    const {
      data: {
        sprites: {
          other: {
            "official-artwork": { front_default },
          },
        },
      },
    } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${Number(id).toString()}`
    );

    pokemon = pokemon_ref.data() as Pokemon;
    pokemon.img = front_default;
  } catch (e) {
    console.error(e);
    //if error, return undefined
  }
  return pokemon;
}
