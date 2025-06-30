import { Global, Module } from '@nestjs/common';
import { CacheService } from './services/cache.service';
import { ConfigService } from '@nestjs/config';
import { redisCacheFactory } from './config/redis.config';

@Global()
@Module({
  providers: [
    {
      provide: 'CACHE_MANAGER',
      inject: [ConfigService],
      useFactory: redisCacheFactory,
    },
    CacheService,
  ],
  exports: [CacheService, 'CACHE_MANAGER'],
})
export class CommonModule {}
