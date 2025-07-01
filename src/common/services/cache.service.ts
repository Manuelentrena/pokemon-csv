import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import Keyv from 'keyv';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Keyv) {}

  async get<T>(key: string): Promise<T | null> {
    const value = await this.cacheManager.get<T>(key);
    return value ?? null;
  }

  async set<T>(key: string, value: T, ttlSeconds = 3600): Promise<void> {
    try {
      await this.cacheManager.set(key, value, ttlSeconds * 1000);
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async disconnect(): Promise<void> {
    if (typeof this.cacheManager.disconnect === 'function') {
      await this.cacheManager.disconnect();
    }
  }
}
