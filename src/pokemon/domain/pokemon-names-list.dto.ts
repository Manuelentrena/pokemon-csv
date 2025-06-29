export class PokemonNameDto {
  name: string;
}

export class PokemonNamesListDto {
  count: number;
  results: PokemonNameDto[];
}
