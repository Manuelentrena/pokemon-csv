import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Pokemon CSV API')
  .setDescription('API para consultar y exportar pokémon')
  .setVersion('1.0')
  .addTag('pokemon', 'Operaciones relacionadas con pokémon')
  .addServer('http://localhost:3000', 'Local environment')
  .build();
