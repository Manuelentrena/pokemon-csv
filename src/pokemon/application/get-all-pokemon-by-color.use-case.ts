import { Injectable } from '@nestjs/common';
import { PokemonRepository } from '../domain/pokemon.repository';
import { PokemonColor } from '../domain/pokemon-color.enum';

@Injectable()
export class GetAllPokemonByColorUseCase {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  execute(color: PokemonColor) {
    return this.pokemonRepository.getAllByColor(color);
  }
}
