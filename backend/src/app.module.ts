import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HttpModule } from "@nestjs/axios";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { MulterModule } from "@nestjs/platform-express";
import { ConfigModule } from "@nestjs/config";
import { User } from "./user/user/entity/user.entity";
import { AuthService } from "./auth/auth.service";
import { AuthModule } from "./auth/auth.module";
import { JwtService } from "@nestjs/jwt";
import { UserModule } from "./user/user.module";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./auth/roles.guard";
import { FilterHelper } from "./helpers/filter.helper";
import { ScheduleModule } from "@nestjs/schedule";
import { BullModule } from "@nestjs/bull";
import { ResponseModule } from "./response/response.module";
import { ReportModule } from "./reports/report.module";
import { CategoryModule } from "./category/category.module";
import { Category } from "./category/entity/category.entity";
import { VictimModule } from "./christian/christian.module";
import { Certificate } from "./certificates/entity/certificate.entity";
import { CertificateModule } from "./certificates/certificate.module";
import { Church } from "./church/church.entity";
import { ChurchModule } from "./church/church.module";
import { ChurchController } from "./church/church.controller";
import { ChurchService } from "./church/church.service";
import { Christian } from "./christian/entity/christian.entity";
import { Post } from "./post/post.entity";
import { PostModule } from "./post/post.module";
import { ChristianReportModule } from "./report/report.module copy";
import { Attendence } from "./attendence/attendence.entity";
import { AttendenceModule } from "./attendence/attendence.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    MulterModule.register({
      dest: "./imageFiles",
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      entities: [User, Category, Christian, Post, Certificate, Attendence, Church],
      logging: false,
      synchronize: true,
      // logging:true
    }),
    // PeriodsModule,
    CategoryModule,
    HttpModule,
    AuthModule,
    UserModule,
    ResponseModule,
    ReportModule,
    VictimModule,
    AttendenceModule,
    CertificateModule,
    PostModule,
    ReportModule,
    ChristianReportModule,
    // LocationModule,
  ],
  controllers: [AppController, ChurchController],
  providers: [AppService, AuthService, JwtService, ChurchService, FilterHelper],
})
export class AppModule { }
