import { IsNotEmpty, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ChurchDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "church name required",
  })
  churchName: string;
}
