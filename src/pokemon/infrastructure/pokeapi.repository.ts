import { Injectable, NotFoundException } from '@nestjs/common';
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
import { isAxiosError } from 'axios';
import { PokemonFailedStore } from '../application/services/pokemon-failed.store';

@Injectable()
export class PokeApiRepository implements PokemonRepository {
  constructor(
    private readonly http: HttpService,
    private readonly failedStore: PokemonFailedStore,
  ) {}

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

    try {
      const { data } = await lastValueFrom(
        this.http.get<PokemonApiResponse>(url),
      );

      return new Pokemon(
        data.name,
        data.height,
        data.weight,
        data.base_experience,
      );
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (error.response?.status === 404) {
          this.failedStore.add(name);
          throw new NotFoundException(`Pokemon "${name}" not found`);
        }
      }
      throw error;
    }
  }

  async getAllByColor(color: PokemonColor): Promise<string[]> {
    const url = `https://pokeapi.co/api/v2/pokemon-color/${color}`;

    const { data } = await lastValueFrom(
      this.http.get<PokemonColorApiResponse>(url),
    );

    return data.pokemon_species.map((species) => species.name);
  }
}
