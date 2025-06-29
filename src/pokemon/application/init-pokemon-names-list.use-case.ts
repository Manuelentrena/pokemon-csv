import { Injectable, OnModuleInit } from '@nestjs/common';
import { PokemonRepository } from '../domain/pokemon.repository';
import { PokemonNamesListStore } from './services/pokemon-names-list.store';

@Injectable()
export class InitPokemonNamesListUseCase implements OnModuleInit {
  constructor(
    private readonly pokemonRepository: PokemonRepository,
    private readonly namesListStore: PokemonNamesListStore,
  ) {}

  async onModuleInit() {
    const list = await this.pokemonRepository.getAllNames();
    this.namesListStore.setList(list);
  }
}
