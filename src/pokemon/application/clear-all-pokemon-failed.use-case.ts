import { Injectable } from '@nestjs/common';
import { PokemonFailedStore } from './services/pokemon-failed.store';

@Injectable()
export class ClearAllPokemonsFailedUseCase {
  constructor(private readonly failedStore: PokemonFailedStore) {}

  execute() {
    return this.failedStore.clear();
  }
}
