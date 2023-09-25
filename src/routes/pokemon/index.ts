import express, { Request, Response } from "express";
import {
  getPokemonByFilterController,
  getPokemonByIdController,
} from "../../controllers/pokemon";
const pokemon_router = express.Router();

// Define the /pokemon route in this file
pokemon_router.get("/", getPokemonByFilterController);

pokemon_router.get("/:pokemon_id", getPokemonByIdController);

export { pokemon_router };
