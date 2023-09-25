import { Trainer } from "src/types/trainer/trainer";

const trainer: Trainer = {
  id: "1",
  name: "Dan",
  age: 31,
  birthday: "02/15/1992",
  badges: 8,
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

export function createNewTrainer({
  age,
  name,
  birthday,
}: {
  age: number;
  name: string;
  birthday: string;
}): Trainer {
  return {
    id: "1",
    name,
    age,
    birthday,
    pokemon_party: [],
    badges: 0,
  };
}
