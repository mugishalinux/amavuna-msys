"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserModule = void 0;
var common_1 = require("@nestjs/common");
var auth_module_1 = require("../auth/auth.module");
var user_controller_1 = require("./user/user.controller");
var user_service_1 = require("./user/user.service");
var jwt_1 = require("@nestjs/jwt");
var response_module_1 = require("../response/response.module");
var filter_helper_1 = require("../helpers/filter.helper");
var admin_seeder_1 = require("./user/admin.seeder");
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        (0, common_1.Module)({
            imports: [(0, common_1.forwardRef)(function () { return auth_module_1.AuthModule; }), response_module_1.ResponseModule],
            controllers: [user_controller_1.UserController],
            providers: [user_service_1.UserService, jwt_1.JwtService, admin_seeder_1.AdminSeeder, filter_helper_1.FilterHelper],
            exports: [user_service_1.UserService, admin_seeder_1.AdminSeeder]
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
