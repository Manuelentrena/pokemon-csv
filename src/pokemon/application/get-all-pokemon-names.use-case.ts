import { Injectable } from '@nestjs/common';
import { PokemonNamesListStore } from './services/pokemon-names-list.store';

@Injectable()
export class GetAllPokemonNamesUseCase {
  constructor(private readonly namesListStore: PokemonNamesListStore) {}

  execute() {
    return this.namesListStore.getList();
  }
}
