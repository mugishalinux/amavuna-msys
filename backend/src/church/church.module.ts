ChurchController
import { forwardRef, Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { JwtService } from "@nestjs/jwt";
import { ResponseModule } from "../response/response.module";

import { FilterHelper } from "../helpers/filter.helper";
import { UserService } from "../user/user/user.service";
import { ChurchService } from "./church.service";
import { ChurchController } from "./church.controller";


@Module({
  imports: [forwardRef(() => AuthModule), ResponseModule],
  controllers: [],
  providers: [
    UserService,
    ChurchService,
    JwtService,
    FilterHelper,
  ],
  exports: [],
})
export class ChurchModule {}
