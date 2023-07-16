import { IsNotEmpty, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CertificateUpdateDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "christian id required",
  })
  victim: number;
  @IsNotEmpty()
  @ApiProperty({
    description: "is allowed status is required",
  })
  isAllowed: boolean;
}
