import { ApiProperty } from '@nestjs/swagger';

export class MenuItemTranslationResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'en' })
  locale: string;

  @ApiProperty({ example: 'Cheeseburger' })
  name: string;

  @ApiProperty({ example: '2024-03-19T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-03-19T12:00:00Z' })
  updatedAt: Date;
}

export class MenuItemResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 9.99 })
  price: number;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  menuId: string;

  @ApiProperty({ type: [MenuItemTranslationResponseDto] })
  translations: MenuItemTranslationResponseDto[];

  @ApiProperty({ example: '2024-03-19T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-03-19T12:00:00Z' })
  updatedAt: Date;
}
