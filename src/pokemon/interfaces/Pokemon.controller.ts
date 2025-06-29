import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { SearchPokemonByNameUseCase } from '../application/search-pokemon-by-name.use-case';
import { GetAllPokemonNamesUseCase } from '../application/get-all-pokemon-names.use-case';
import { FindByNameQueryDto } from './dto/find-by-name-query.dto';
import { GetPokemonByNameUseCase } from '../application/get-pokemon-by-name.use-case';
import { GetPokemonCsvByColorDto } from './dto/get-pokemon-by-color.dto';
import { GetAllPokemonByColorUseCase } from '../application/get-all-pokemon-by-color.use-case';
import { GetAllPokemonsFailedUseCase } from '../application/get-all-pokemons-failed.use-case';
import { ClearAllPokemonsFailedUseCase } from '../application/clear-all-pokemon-failed.use-case';
import { promiseAllSafe } from 'src/common/utils/promise-all-safe.util';
import { PokemonCsvGeneratorService } from '../application/services/pokemon-csv-generator.service';
import { Response } from 'express';

@Controller('pokemon')
export class PokemonController {
  constructor(
    private readonly searchByName: SearchPokemonByNameUseCase,
    private readonly getAllNames: GetAllPokemonNamesUseCase,
    private readonly getPokemonByName: GetPokemonByNameUseCase,
    private readonly getAllPokemonByColor: GetAllPokemonByColorUseCase,
    private readonly getAllPokemonFailed: GetAllPokemonsFailedUseCase,
    private readonly clearAllPokemonFailed: ClearAllPokemonsFailedUseCase,
    private readonly pokemonCsvGenerator: PokemonCsvGeneratorService,
  ) {}

  @Get('findByName')
  async search(@Query() query: FindByNameQueryDto) {
    const allNames = this.searchByName.execute(query.name);

    const { fulfilled: pokemons, rejected } = await promiseAllSafe(
      allNames.results.map((name) => this.getPokemonByName.execute(name)),
    );

    return {
      count: pokemons.length,
      results: pokemons,
      errors: rejected,
    };
  }

  @Get('csv/:color')
  async getCsvByColor(
    @Param() params: GetPokemonCsvByColorDto,
    @Res() res: Response,
  ) {
    // Clear the failed Pokemon list before fetching new data
    this.clearAllPokemonFailed.execute();

    // Fetch all Pokemon names by color
    const allPokemonByColor = await this.getAllPokemonByColor.execute(
      params.color,
    );

    // Fetch detailed information for each Pokemon
    const { fulfilled: pokemons, rejected: _ } = await promiseAllSafe(
      allPokemonByColor.map((name) => this.getPokemonByName.execute(name)),
    );

    // Get all failed Pokemon
    const pokemonsFailed = this.getAllPokemonFailed.execute();

    // Generate CSV
    const csv = this.pokemonCsvGenerator.generate(
      pokemons,
      params.color,
      pokemonsFailed,
    );

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=pokemons-${params.color}.csv`,
    );
    res.send(csv);
  }

  @Get('getAllNames')
  allNames() {
    return this.getAllNames.execute();
  }
}
