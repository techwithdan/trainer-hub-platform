export interface Trainer {
  id: string;
  name: string;
  age: number;
  email?: string;
  birthday: string;
  pokemon_party: Pokemon[];
  badges: number;
}
