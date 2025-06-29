import { Controller, Get, Query } from '@nestjs/common';
import { SearchPokemonByNameUseCase } from '../application/search-pokemon-by-name.use-case';
import { GetAllPokemonNamesUseCase } from '../application/get-all-pokemon-names.use-case';
import { FindByNameQueryDto } from './dto/find-by-name-query.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(
    private readonly searchByName: SearchPokemonByNameUseCase,
    private readonly getAllNames: GetAllPokemonNamesUseCase,
  ) {}

  @Get('findByName')
  search(@Query() query: FindByNameQueryDto) {
    return this.searchByName.execute(query.name);
  }

  @Get('getAllNames')
  allNames() {
    return this.getAllNames.execute();
  }
}
