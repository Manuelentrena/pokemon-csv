import { Injectable, NotFoundException } from '@nestjs/common';
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
import { CacheService } from 'src/common/services/cache.service';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PokeApiRepository implements PokemonRepository {
  constructor(
    private readonly failedStore: PokemonFailedStore,
    private readonly cache: CacheService,
    private readonly http: HttpService,
  ) {}

  async getAllNames(): Promise<PokemonNamesListDto> {
    const cacheKey = 'pokeapi:all-names';

    const cached = await this.cache.get<PokemonNamesListDto>(cacheKey);
    if (cached) {
      return cached;
    }

    const url = `https://pokeapi.co/api/v2/pokemon?limit=100000`;
    const { data } = await lastValueFrom(
      this.http.get<PokemonListApiResponse>(url),
    );
    const result: PokemonNamesListDto = {
      count: data.count,
      results: data.results.map((pokemon) => pokemon.name),
    };

    await this.cache.set(cacheKey, result, 3600);
    return result;
  }

  async getOneByName(name: string): Promise<Pokemon> {
    const cacheKey = `pokeapi:pokemon:${name}`;

    const cached = await this.cache.get<Pokemon>(cacheKey);
    if (cached) {
      return cached;
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    try {
      const { data } = await lastValueFrom(
        this.http.get<PokemonApiResponse>(url),
      );
      const result = new Pokemon(
        data.name,
        data.height,
        data.weight,
        data.base_experience,
      );

      await this.cache.set(cacheKey, result, 3600);
      return result;
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
    const cacheKey = `pokeapi:color:${color}`;

    const cached = await this.cache.get<string[]>(cacheKey);
    if (cached) {
      return cached;
    }

    const url = `https://pokeapi.co/api/v2/pokemon-color/${color}`;
    const { data } = await lastValueFrom(
      this.http.get<PokemonColorApiResponse>(url),
    );
    const result = data.pokemon_species.map((species) => species.name);

    await this.cache.set(cacheKey, result, 3600);
    return result;
  }
}
