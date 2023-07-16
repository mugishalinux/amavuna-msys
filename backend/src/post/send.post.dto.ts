import { IsNotEmpty, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../user/user/entity/user.entity";

export class SendPostDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "post id",
  })
  post: number;

  @IsNotEmpty()
  @ApiProperty({
    description: "user id ",
  })
  user: number;
}
