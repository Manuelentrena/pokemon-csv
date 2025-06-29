import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { PokemonRepository } from '../domain/pokemon.repository';
import { PokemonNamesListDto } from '../domain/pokemon-names-list.dto';
import { PokemonListApiResponse } from './types/pokeapi.response';

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
      results: data.results.map(({ name }) => ({ name })),
    };
  }
}
