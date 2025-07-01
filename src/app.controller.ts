import { Controller, Get, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Bienvenida')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({
    summary: 'Página de bienvenida',
    description:
      'Muestra una página HTML de bienvenida con enlace a la documentación Swagger.',
  })
  @ApiResponse({ status: 200, description: 'Página HTML de bienvenida.' })
  getHome(@Res() res: Response) {
    res.type('html').send(`
      <html>
        <head>
          <title>Pokémon CSV API</title>
        </head>
        <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
          <h1>¡Bienvenido a Pokémon CSV API!</h1>
          <p>Consulta la documentación interactiva en:</p>
          <a href="/api" style="font-size: 1.2em; color: #1976d2;">/api (Swagger)</a>
        </body>
      </html>
    `);
  }
}
