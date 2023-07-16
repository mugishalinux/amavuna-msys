import { IsNotEmpty, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CertificateRegisterDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "christian id required",
  })
  victim: number;
}
