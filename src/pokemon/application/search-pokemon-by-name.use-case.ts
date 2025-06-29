import { Injectable } from '@nestjs/common';
import { PokemonNamesListStore } from './services/pokemon-names-list.store';

@Injectable()
export class SearchPokemonByNameUseCase {
  constructor(private readonly namesListStore: PokemonNamesListStore) {}

  execute(name: string) {
    return this.namesListStore.searchByName(name);
  }
}
