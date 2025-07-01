import { Injectable } from '@nestjs/common';

@Injectable()
export class PokemonFailedStore {
  private failed: string[] = [];

  add(name: string) {
    this.failed.push(name);
  }

  getAll(): string[] {
    return [...this.failed].sort((a, b) => a.localeCompare(b));
  }

  clear() {
    this.failed = [];
  }
}
