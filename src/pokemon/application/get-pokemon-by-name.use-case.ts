import { Injectable } from '@nestjs/common';
import { PokemonRepository } from '../domain/pokemon.repository';

@Injectable()
export class GetPokemonByNameUseCase {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  execute(name: string) {
    return this.pokemonRepository.getOneByName(name);
  }
}
