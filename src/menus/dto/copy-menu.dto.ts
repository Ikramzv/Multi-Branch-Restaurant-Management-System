import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CopyMenuDto {
  @ApiProperty({
    description: 'The ID of the source menu',
  })
  @IsNotEmpty()
  @IsString()
  sourceMenuId: string;

  @ApiProperty({
    description: 'The ID of the target menu',
  })
  @IsNotEmpty()
  @IsString()
  targetMenuId: string;
}
