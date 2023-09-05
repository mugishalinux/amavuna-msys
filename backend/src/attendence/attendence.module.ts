import { forwardRef, Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { JwtService } from "@nestjs/jwt";
import { ResponseModule } from "../response/response.module";

import { FilterHelper } from "../helpers/filter.helper";
import { UserService } from "../user/user/user.service";
import { CertificateModule } from "../certificates/certificate.module";
import { AttendenceController } from "./attendence.controller";


@Module({
  imports: [forwardRef(() => AuthModule), ResponseModule, CertificateModule],
  controllers: [AttendenceController],
  providers: [UserService, JwtService, FilterHelper],
  exports: [],
})
export class AttendenceModule {}
