import { Controller, Get, Query } from '@nestjs/common';
import { SearchPokemonByNameUseCase } from '../application/search-pokemon-by-name.use-case';
import { GetAllPokemonNamesUseCase } from '../application/get-all-pokemon-names.use-case';
import { FindByNameQueryDto } from './dto/find-by-name-query.dto';
import { GetPokemonByNameUseCase } from '../application/get-pokemon-by-name.use-case';

@Controller('pokemon')
export class PokemonController {
  constructor(
    private readonly searchByName: SearchPokemonByNameUseCase,
    private readonly getAllNames: GetAllPokemonNamesUseCase,
    private readonly getPokemonByName: GetPokemonByNameUseCase,
  ) {}

  @Get('findByName')
  async search(@Query() query: FindByNameQueryDto) {
    const allNames = this.searchByName.execute(query.name);
    const pokemons = await Promise.all(
      allNames.results.map((name) => this.getPokemonByName.execute(name)),
    );
    return {
      count: pokemons.length,
      results: pokemons,
    };
  }

  @Get('getAllNames')
  allNames() {
    return this.getAllNames.execute();
  }
}
