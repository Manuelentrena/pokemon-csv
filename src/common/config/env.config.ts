export const EnvConfiguration = () => ({
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
    ttl: parseInt(process.env.REDIS_PORT ?? '3600', 10),
    user: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
  },
});
