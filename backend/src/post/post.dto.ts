import { IsNotEmpty, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../user/user/entity/user.entity";

export class PostDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "provide post title",
  })
  postTitle: string;
  @IsNotEmpty()
  @ApiProperty({
    description: "provide post content",
  })
  postContent: string;
  @IsNotEmpty()
  @ApiProperty({
    description: "user id ",
  })
  user: number;
}
