"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var axios_1 = require("@nestjs/axios");
var app_service_1 = require("./app.service");
var app_controller_1 = require("./app.controller");
var platform_express_1 = require("@nestjs/platform-express");
var config_1 = require("@nestjs/config");
var user_entity_1 = require("./user/user/entity/user.entity");
var auth_service_1 = require("./auth/auth.service");
var auth_module_1 = require("./auth/auth.module");
var jwt_1 = require("@nestjs/jwt");
var user_module_1 = require("./user/user.module");
var filter_helper_1 = require("./helpers/filter.helper");
var schedule_1 = require("@nestjs/schedule");
var response_module_1 = require("./response/response.module");
var report_module_1 = require("./reports/report.module");
var category_module_1 = require("./category/category.module");
var category_entity_1 = require("./category/entity/category.entity");
var christian_module_1 = require("./christian/christian.module");
var certificate_entity_1 = require("./certificates/entity/certificate.entity");
var certificate_module_1 = require("./certificates/certificate.module");
var church_entity_1 = require("./church/church.entity");
var church_controller_1 = require("./church/church.controller");
var church_service_1 = require("./church/church.service");
var christian_entity_1 = require("./christian/entity/christian.entity");
var post_entity_1 = require("./post/post.entity");
var post_module_1 = require("./post/post.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                schedule_1.ScheduleModule.forRoot(),
                config_1.ConfigModule.forRoot(),
                platform_express_1.MulterModule.register({
                    dest: "./imageFiles"
                }),
                typeorm_1.TypeOrmModule.forRoot({
                    type: "mysql",
                    host: process.env.DATABASE_HOST,
                    port: Number(process.env.DATABASE_PORT),
                    username: process.env.DATABASE_USER,
                    password: process.env.DATABASE_PASSWORD,
                    database: process.env.DATABASE_DB,
                    entities: [user_entity_1.User, category_entity_1.Category, christian_entity_1.Christian, post_entity_1.Post, certificate_entity_1.Certificate, church_entity_1.Church],
                    logging: false,
                    synchronize: true
                }),
                // PeriodsModule,
                category_module_1.CategoryModule,
                axios_1.HttpModule,
                auth_module_1.AuthModule,
                user_module_1.UserModule,
                response_module_1.ResponseModule,
                report_module_1.ReportModule,
                christian_module_1.VictimModule,
                certificate_module_1.CertificateModule,
                post_module_1.PostModule,
                // LocationModule,
            ],
            controllers: [app_controller_1.AppController, church_controller_1.ChurchController],
            providers: [app_service_1.AppService, auth_service_1.AuthService, jwt_1.JwtService, church_service_1.ChurchService, filter_helper_1.FilterHelper]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
