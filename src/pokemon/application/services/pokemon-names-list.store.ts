import { Injectable } from '@nestjs/common';
import { PokemonNamesListDto } from '../../domain/pokemon-names-list.dto';

@Injectable()
export class PokemonNamesListStore {
  private pokemonNamesList: PokemonNamesListDto;

  setList(list: PokemonNamesListDto) {
    this.pokemonNamesList = list;
  }

  getList(): PokemonNamesListDto {
    return this.pokemonNamesList;
  }

  searchByName(name: string): PokemonNamesListDto {
    if (!this.pokemonNamesList) {
      return { count: 0, results: [] };
    }

    const terms = name.toLowerCase().split(/\s+/);

    const filteredResults = this.pokemonNamesList.results.filter(({ name }) =>
      terms.some((term) => name.toLowerCase().includes(term)),
    );

    return {
      count: filteredResults.length,
      results: filteredResults,
    };
  }
}
