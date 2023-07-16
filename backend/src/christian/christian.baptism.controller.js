"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.ChristianBaptismController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var ChristianBaptismController = /** @class */ (function () {
    function ChristianBaptismController(christianService, authService, filter, jwtService) {
        this.christianService = christianService;
        this.authService = authService;
        this.filter = filter;
        this.jwtService = jwtService;
    }
    ChristianBaptismController.prototype.allowChristianBaptism = function (id, req) {
        return this.christianService.allowChristianBaptism(id);
    };
    ChristianBaptismController.prototype.disAllowChristianBaptism = function (id, req) {
        return this.christianService.disAllowChristianBaptism(id);
    };
    __decorate([
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Put)("allow/:id"),
        __param(0, (0, common_1.Param)("id")),
        __param(1, (0, common_1.Request)())
    ], ChristianBaptismController.prototype, "allowChristianBaptism");
    __decorate([
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Put)("disallow/:id"),
        __param(0, (0, common_1.Param)("id")),
        __param(1, (0, common_1.Request)())
    ], ChristianBaptismController.prototype, "disAllowChristianBaptism");
    ChristianBaptismController = __decorate([
        (0, common_1.Controller)("christianBaptima"),
        (0, swagger_1.ApiTags)("christianBaptima")
    ], ChristianBaptismController);
    return ChristianBaptismController;
}());
exports.ChristianBaptismController = ChristianBaptismController;
