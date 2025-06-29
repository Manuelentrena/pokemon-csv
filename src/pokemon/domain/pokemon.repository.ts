import { PokemonNamesListDto } from './pokemon-names-list.dto';

export abstract class PokemonRepository {
  abstract getAllNames(): Promise<PokemonNamesListDto>;
}
