import { forwardRef, Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { JwtService } from "@nestjs/jwt";
import { ResponseModule } from "../response/response.module";

import { FilterHelper } from "../helpers/filter.helper";
import { UserService } from "../user/user/user.service";
import { CertificateModule } from "../certificates/certificate.module";
import { ChristianService } from "./christian.service";
import { ChristianController } from "./christian.controller";
import { ChristianBaptismController } from "./christian.baptism.controller";

@Module({
  imports: [forwardRef(() => AuthModule), ResponseModule, CertificateModule],
  controllers: [ChristianController, ChristianBaptismController],
  providers: [UserService, ChristianService, JwtService, FilterHelper],
  exports: [],
})
export class VictimModule {}
