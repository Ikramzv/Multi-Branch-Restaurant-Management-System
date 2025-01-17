import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsTimeZone } from 'class-validator';

export class CreateBranchDto {
  @ApiProperty({ example: 'Downtown Branch' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'America/New_York' })
  @IsString()
  @IsNotEmpty()
  @IsTimeZone({})
  timezone: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsString()
  @IsNotEmpty()
  restaurantId: string;
}
