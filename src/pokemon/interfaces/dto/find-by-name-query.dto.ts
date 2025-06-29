import { IsString, IsNotEmpty } from 'class-validator';

export class FindByNameQueryDto {
  @IsString({ message: 'The "name" parameter must be a string.' })
  @IsNotEmpty({ message: 'The "name" parameter cannot be empty.' })
  name: string;
}
