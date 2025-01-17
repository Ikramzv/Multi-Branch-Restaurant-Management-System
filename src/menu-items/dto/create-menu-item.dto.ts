import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class MenuItemTranslationDto {
  @ApiProperty({ example: 'en' })
  @IsString()
  @IsNotEmpty()
  locale: string;

  @ApiProperty({ example: 'Cheeseburger' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateMenuItemDto {
  @ApiProperty({ example: 9.99 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsString()
  @IsNotEmpty()
  menuId: string;

  @ApiProperty({ type: [MenuItemTranslationDto] })
  @ValidateNested({ each: true })
  @Type(() => MenuItemTranslationDto)
  translations: MenuItemTranslationDto[];
}
