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
  @Matches(/(07[8,2,3,9])[0-9]{7}/, {
    message:
      "Primary Phone Number must be Airtel or MTN number formatted like 07*********",
  })
  @IsNotEmpty()
  @ApiProperty({
    description: "phone number required",
  })
  phoneNumber: string;
}
