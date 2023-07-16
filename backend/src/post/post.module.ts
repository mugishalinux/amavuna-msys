import { forwardRef, Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { JwtService } from "@nestjs/jwt";
import { ResponseModule } from "../response/response.module";

import { FilterHelper } from "../helpers/filter.helper";
import { UserService } from "../user/user/user.service";
import { ChurchController } from "../church/church.controller";
import { ChurchService } from "../church/church.service";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { SendPostController } from "./send.post.controller";
import { SendPostService } from "./send.post";

@Module({
  imports: [forwardRef(() => AuthModule), ResponseModule],
  controllers: [ChurchController, PostController, SendPostController],
  providers: [
    UserService,
    SendPostService,
    PostService,
    ChurchService,
    JwtService,
    FilterHelper,
  ],
  exports: [],
})
export class PostModule {}
