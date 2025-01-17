import { ApiProperty } from '@nestjs/swagger';
import { MenuItemResponseDto } from '../../menu-items/dto/menu-item.response.dto';

export class MenuResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  branchId: string;

  @ApiProperty({ example: '2024-03-19T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-03-19T12:00:00Z' })
  updatedAt: Date;

  @ApiProperty({ type: [MenuItemResponseDto] })
  menuItems: MenuItemResponseDto[];
}
