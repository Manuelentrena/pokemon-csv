import { Global, Module } from '@nestjs/common';
import { CacheService } from './services/cache.service';
import { ConfigService } from '@nestjs/config';
import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';

@Global()
@Module({
  providers: [
    {
      provide: 'CACHE_MANAGER',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisStore = new KeyvRedis(
          `redis://${configService.get<string>('REDIS_HOST')}:${configService.get<string>('REDIS_PORT')}`,
        );
        return new Keyv({
          store: redisStore,
          namespace: '',
          ttl: configService.get<number>('CACHE_TTL', 3600) * 1000, // Default TTL in milliseconds
        });
      },
    },
    CacheService,
  ],
  exports: [CacheService, 'CACHE_MANAGER'],
})
export class CommonModule {}
