import { forwardRef, Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { JwtService } from "@nestjs/jwt";
import { ResponseModule } from "../response/response.module";
import { ChristianReportController } from "./report.controller";


@Module({
  imports: [forwardRef(() => AuthModule), ResponseModule],
  controllers: [ChristianReportController, ],
  providers: [],
  exports: [],
})
export class ChristianReportModule {}
