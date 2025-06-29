import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PokeApiRepository } from './infrastructure/pokeapi.repository';
import { PokemonRepository } from './domain/pokemon.repository';
import { InitPokemonNamesListUseCase } from './application/init-pokemon-names-list.use-case';
import { PokemonNamesListStore } from './application/services/pokemon-names-list.store';
import { PokemonController } from './interfaces/Pokemon.controller';
import { SearchPokemonByNameUseCase } from './application/search-pokemon-by-name.use-case';
import { GetAllPokemonNamesUseCase } from './application/get-all-pokemon-names.use-case';
import { GetPokemonByNameUseCase } from './application/get-pokemon-by-name.use-case';

@Module({
  imports: [HttpModule],
  controllers: [PokemonController],
  providers: [
    PokeApiRepository,
    InitPokemonNamesListUseCase,
    SearchPokemonByNameUseCase,
    GetAllPokemonNamesUseCase,
    GetPokemonByNameUseCase,
    PokemonNamesListStore,
    {
      provide: PokemonRepository,
      useClass: PokeApiRepository,
    },
  ],
})
export class PokemonModule {}
