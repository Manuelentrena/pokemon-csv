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
import { GetAllPokemonByColorUseCase } from './application/get-all-pokemon-by-color.use-case';
import { PokemonFailedStore } from './application/services/pokemon-failed.store';
import { ClearAllPokemonsFailedUseCase } from './application/clear-all-pokemon-failed.use-case';
import { GetAllPokemonsFailedUseCase } from './application/get-all-pokemons-failed.use-case';
import { PokemonCsvGeneratorService } from './application/services/pokemon-csv-generator.service';

@Module({
  imports: [HttpModule],
  controllers: [PokemonController],
  providers: [
    PokeApiRepository,
    InitPokemonNamesListUseCase,
    SearchPokemonByNameUseCase,
    GetAllPokemonNamesUseCase,
    GetPokemonByNameUseCase,
    GetAllPokemonByColorUseCase,
    GetAllPokemonsFailedUseCase,
    ClearAllPokemonsFailedUseCase,
    PokemonNamesListStore,
    PokemonFailedStore,
    PokemonCsvGeneratorService,
    {
      provide: PokemonRepository,
      useClass: PokeApiRepository,
    },
  ],
  exports: [],
})
export class PokemonModule {}
