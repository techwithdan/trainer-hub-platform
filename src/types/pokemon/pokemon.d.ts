export interface Pokemon {
  id: string;
  name: string;
  type: string;
  weaknesses: Record<string, number | undefined>;
  img?: string;
}
