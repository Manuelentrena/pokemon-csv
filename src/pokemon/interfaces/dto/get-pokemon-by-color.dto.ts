import { IsEnum } from 'class-validator';
import { PokemonColor } from '../../domain/pokemon-color.enum';

export class GetPokemonCsvByColorDto {
  @IsEnum(PokemonColor, { message: 'Invalid color' })
  color: PokemonColor;
}
