import { ConfigService } from '@nestjs/config';
import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';

export const redisCacheFactory = (configService: ConfigService) => {
  const host = configService.get<string>('REDIS_HOST');
  const port = configService.get<string>('REDIS_PORT');
  const ttl = configService.get<number>('CACHE_TTL', 3600);

  const redisStore = new KeyvRedis(`redis://${host}:${port}`);
  return new Keyv({
    store: redisStore,
    namespace: '',
    ttl: ttl * 1000, // TTL en milisegundos
  });
};
