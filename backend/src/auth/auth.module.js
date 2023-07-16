"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var auth_service_1 = require("./auth.service");
var local_strategy_1 = require("./local.strategy");
var dotenv = require("dotenv");
var jwt_1 = require("@nestjs/jwt");
var user_service_1 = require("../user/user/user.service");
var user_module_1 = require("../user/user.module");
var jwt_strategy_1 = require("./jwt.strategy");
var response_module_1 = require("../response/response.module");
var roles_guard_1 = require("./roles.guard");
dotenv.config();
require("dotenv").config();
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        (0, common_1.Module)({
            imports: [
                (0, common_1.forwardRef)(function () { return user_module_1.UserModule; }),
                passport_1.PassportModule,
                response_module_1.ResponseModule,
                jwt_1.JwtModule.register({
                    secret: process.env.JWT_SECRET,
                    // secret: jwtConstants.secret,
                    signOptions: { expiresIn: "10s" }
                }),
            ],
            providers: [auth_service_1.AuthService, jwt_1.JwtService, user_service_1.UserService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy, roles_guard_1.RolesGuard],
            exports: [auth_service_1.AuthService, roles_guard_1.RolesGuard]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
