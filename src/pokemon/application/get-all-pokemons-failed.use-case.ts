import { Injectable } from '@nestjs/common';
import { PokemonFailedStore } from './services/pokemon-failed.store';

@Injectable()
export class GetAllPokemonsFailedUseCase {
  constructor(private readonly failedStore: PokemonFailedStore) {}

  execute() {
    return this.failedStore.getAll();
  }
}
