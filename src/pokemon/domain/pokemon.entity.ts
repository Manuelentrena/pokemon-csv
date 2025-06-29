import { IsString, IsInt, Min, IsNotEmpty } from 'class-validator';

export class Pokemon {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  base_experience: number;

  @IsInt()
  @Min(0)
  height: number;

  @IsInt()
  @Min(0)
  weight: number;

  constructor(
    name: string,
    base_experience: number,
    height: number,
    weight: number,
  ) {
    this.name = name;
    this.base_experience = base_experience;
    this.height = height;
    this.weight = weight;
  }
}
