import { ApiProperty, OmitType } from '@nestjs/swagger';
import { BranchResponseDto } from '../../branches/dto/branch.response.dto';

export class RestaurantResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'Restaurant Name' })
  name: string;

  @ApiProperty({ example: 'America/New_York' })
  timezone: string;

  @ApiProperty({ example: 'en' })
  defaultLocale: string;

  @ApiProperty({ example: '2024-03-19T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-03-19T12:00:00Z' })
  updatedAt: Date;

  @ApiProperty({ type: [OmitType(BranchResponseDto, ['menus'])] })
  branches: BranchResponseDto[];
}
