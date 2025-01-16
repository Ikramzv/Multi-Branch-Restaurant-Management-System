import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRestaurantDto {
  @ApiProperty({ example: "Restaurant Name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "America/New_York" })
  @IsString()
  @IsNotEmpty()
  timezone: string;

  @ApiProperty({ example: "en" })
  @IsString()
  @IsNotEmpty()
  defaultLocale: string;
}
