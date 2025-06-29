export type PokemonListApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
};

export type PokemonApiResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
};
