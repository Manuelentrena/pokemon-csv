import { ConfigService } from '@nestjs/config';
import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';

export const redisCacheFactory = (configService: ConfigService) => {
  const host = configService.get<string>('REDIS_HOST');
  const port = configService.get<string>('REDIS_PORT');
  const ttl = configService.get<number>('CACHE_TTL', 3600);
  const user = configService.get<string>('REDIS_USER');
  const password = configService.get<string>('REDIS_PASSWORD');
  const nodeEnv = process.env.NODE_ENV;

  let redisUrl = `redis://${host}:${port}`;
  if (nodeEnv === 'production' && password) {
    redisUrl = user
      ? `redis://${user}:${password}@${host}:${port}`
      : `redis://default:${password}@${host}:${port}`;
  }

  const redisStore = new KeyvRedis(redisUrl);
  return new Keyv({
    store: redisStore,
    namespace: '',
    ttl: ttl * 1000, // TTL en milisegundos
  });
};
