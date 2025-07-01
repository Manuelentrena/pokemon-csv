import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().default(6379),
  CACHE_TTL: Joi.number().default(3600),
  REDIS_USER: Joi.string().optional(),
  REDIS_PASSWORD: Joi.string().optional(),
});
