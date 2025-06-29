import { Injectable } from '@nestjs/common';
import { Pokemon } from '../../domain/pokemon.entity';

@Injectable()
export class PokemonCsvGeneratorService {
  generate(
    pokemons: Pokemon[],
    color: string,
    pokemonsFailed: string[],
  ): string {
    const title = `Pokemons of color ${color}`;
    const failedSection = pokemonsFailed.length
      ? `Failed pokemons: ${pokemonsFailed.join(', ')}\n`
      : '\n';
    const header = 'name;base_experience;height;weight';
    const rows = pokemons.map(
      (p) => `${p.name};${p.base_experience};${p.height};${p.weight}`,
    );

    return [title, '', failedSection, header, ...rows].join('\n');
  }
}
