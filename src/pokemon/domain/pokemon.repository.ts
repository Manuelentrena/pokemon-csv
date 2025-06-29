import { PokemonColor } from './pokemon-color.enum';
import { PokemonNamesListDto } from './pokemon-names-list.dto';
import { Pokemon } from './pokemon.entity';

export abstract class PokemonRepository {
  abstract getAllNames(): Promise<PokemonNamesListDto>;
  abstract getOneByName(name: string): Promise<Pokemon>;
  abstract getAllByColor(color: PokemonColor): Promise<string[]>;
}
