import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, Matches } from "class-validator";
import { User } from "../user/user/entity/user.entity";

export class ChristianRegisterDto {
  @IsNotEmpty()
  @ApiProperty({ description: "please enter first name" })
  firstName: string;

  @IsNotEmpty()
  @ApiProperty({ description: "please enter last name" })
  lastName: string;

  @IsNotEmpty()
  @ApiProperty({ description: "please enter date of birth" })
  dob: Date;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: "email required",
  })
  email: string;
  @IsNotEmpty()
  @ApiProperty({
    description: "user is required",
  })
  user: number;

}
