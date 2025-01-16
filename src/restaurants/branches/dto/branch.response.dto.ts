import { ApiProperty } from "@nestjs/swagger";

export class BranchResponseDto {
  @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
  id: string;

  @ApiProperty({ example: "Downtown Branch" })
  name: string;

  @ApiProperty({ example: "America/New_York" })
  timezone: string;

  @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
  restaurantId: string;

  @ApiProperty({ example: false })
  isHeadquarter: boolean;

  @ApiProperty({ example: "2024-03-19T12:00:00Z" })
  createdAt: Date;

  @ApiProperty({ example: "2024-03-19T12:00:00Z" })
  updatedAt: Date;
}
