import { Request, Response } from "express";
import { Pokemon } from "src/types/pokemon/pokemon";
import { getPokemonById, getPokemonByFilter } from "../../services/pokemon";
import axios from "axios"

export async function getPokemonByFilterController(
  req: Request,
  res: Response
): Promise<void> {
  const { type = "", weaknesses = "" } = req.query as {
    type?: string;
    weaknesses?: string;
  };
  const pokemon: Pokemon[] = await getPokemonByFilter({ type, weaknesses });
  res.status(200).json(pokemon);
}

export async function getPokemonByIdController(
  req: Request,
  res: Response
): Promise<void> {
  const { pokemon_id } = req.params;
  const pokemon: Pokemon | undefined = await getPokemonById(pokemon_id);
  res.status(200).json(pokemon || {});
}
