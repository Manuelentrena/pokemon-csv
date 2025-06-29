import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { PokemonRepository } from '../domain/pokemon.repository';
import { PokemonNamesListDto } from '../domain/pokemon-names-list.dto';
import {
  PokemonApiResponse,
  PokemonListApiResponse,
} from './types/pokeapi.type';
import { Pokemon } from '../domain/pokemon.entity';

@Injectable()
export class PokeApiRepository implements PokemonRepository {
  constructor(private readonly http: HttpService) {}

  async getAllNames(): Promise<PokemonNamesListDto> {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=100000`;

    const response = await lastValueFrom(
      this.http.get<PokemonListApiResponse>(url),
    );

    const data = response.data;

    return {
      count: data.count,
      results: data.results.map((pokemon) => pokemon.name),
    };
  }

  async getOneByName(name: string): Promise<Pokemon> {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

    const response = await lastValueFrom(
      this.http.get<PokemonApiResponse>(url),
    );

    const pokemon = response.data;

    return new Pokemon(
      pokemon.name,
      pokemon.height,
      pokemon.weight,
      pokemon.base_experience,
    );
  }
}
