"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VictimModule = void 0;
var common_1 = require("@nestjs/common");
var auth_module_1 = require("../auth/auth.module");
var jwt_1 = require("@nestjs/jwt");
var response_module_1 = require("../response/response.module");
var filter_helper_1 = require("../helpers/filter.helper");
var user_service_1 = require("../user/user/user.service");
var certificate_module_1 = require("../certificates/certificate.module");
var christian_service_1 = require("./christian.service");
var christian_controller_1 = require("./christian.controller");
var christian_baptism_controller_1 = require("./christian.baptism.controller");
var VictimModule = /** @class */ (function () {
    function VictimModule() {
    }
    VictimModule = __decorate([
        (0, common_1.Module)({
            imports: [(0, common_1.forwardRef)(function () { return auth_module_1.AuthModule; }), response_module_1.ResponseModule, certificate_module_1.CertificateModule],
            controllers: [christian_controller_1.ChristianController, christian_baptism_controller_1.ChristianBaptismController],
            providers: [user_service_1.UserService, christian_service_1.ChristianService, jwt_1.JwtService, filter_helper_1.FilterHelper],
            exports: []
        })
    ], VictimModule);
    return VictimModule;
}());
exports.VictimModule = VictimModule;
