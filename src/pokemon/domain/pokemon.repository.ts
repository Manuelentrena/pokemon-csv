import { PokemonNamesListDto } from './pokemon-names-list.dto';
import { Pokemon } from './pokemon.entity';

export abstract class PokemonRepository {
  abstract getAllNames(): Promise<PokemonNamesListDto>;
  abstract getOneByName(name: string): Promise<Pokemon>;
}
