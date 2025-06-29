import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { PokemonRepository } from '../domain/pokemon.repository';
import { PokemonNamesListDto } from '../domain/pokemon-names-list.dto';
import {
  PokemonApiResponse,
  PokemonColorApiResponse,
  PokemonListApiResponse,
} from './types/pokeapi.type';
import { Pokemon } from '../domain/pokemon.entity';
import { PokemonColor } from '../domain/pokemon-color.enum';

@Injectable()
export class PokeApiRepository implements PokemonRepository {
  constructor(private readonly http: HttpService) {}

  async getAllNames(): Promise<PokemonNamesListDto> {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=100000`;

    const { data } = await lastValueFrom(
      this.http.get<PokemonListApiResponse>(url),
    );

    return {
      count: data.count,
      results: data.results.map((pokemon) => pokemon.name),
    };
  }

  async getOneByName(name: string): Promise<Pokemon> {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

    const { data } = await lastValueFrom(
      this.http.get<PokemonApiResponse>(url),
    );

    return new Pokemon(
      data.name,
      data.height,
      data.weight,
      data.base_experience,
    );
  }

  async getAllByColor(color: PokemonColor): Promise<string[]> {
    const url = `https://pokeapi.co/api/v2/pokemon-color/${color}`;

    const { data } = await lastValueFrom(
      this.http.get<PokemonColorApiResponse>(url),
    );

    return data.pokemon_species.map((species) => species.name);
  }
}
