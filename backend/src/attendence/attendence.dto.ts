import { IsNotEmpty, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AttendenceRegistrationDto {
    @IsNotEmpty()
    @ApiProperty({
      description: "date attendence required",
    })
    date: Date;
    @IsNotEmpty()
    @ApiProperty({
      description: "attendence status required",
    })
    status: string;
    @IsNotEmpty()
    @ApiProperty({
      description: "christian id required",
    })
    christian: number;
}
