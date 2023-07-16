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
exports.CertificateController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var has_roles_decorator_1 = require("../auth/has-roles.decorator");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var roles_guard_1 = require("../auth/roles.guard");
var CertificateController = /** @class */ (function () {
    function CertificateController(certificateService, authService, filter, jwtService) {
        this.certificateService = certificateService;
        this.authService = authService;
        this.filter = filter;
        this.jwtService = jwtService;
    }
    CertificateController.prototype.getSingleCertificate = function (id, req) {
        console.log();
        return this.certificateService.getSingleCertificate(id);
    };
    CertificateController.prototype.getSingleAllCertificate = function () {
        return this.certificateService.getAllCertificate();
    };
    CertificateController.prototype.updateCertificate = function (id, data, req) {
        return this.certificateService.updateCertificate(id, data);
    };
    CertificateController.prototype.deleteCertificate = function (id, req) {
        return this.certificateService.deleteCertificate(id, req.user.userId);
    };
    __decorate([
        (0, swagger_1.ApiBearerAuth)(),
        (0, has_roles_decorator_1.HasRoles)("admin"),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        (0, common_1.Get)(":id"),
        __param(0, (0, common_1.Param)("id")),
        __param(1, (0, common_1.Request)())
    ], CertificateController.prototype, "getSingleCertificate");
    __decorate([
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Get)("")
    ], CertificateController.prototype, "getSingleAllCertificate");
    __decorate([
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Put)(":id"),
        __param(0, (0, common_1.Param)("id")),
        __param(1, (0, common_1.Body)()),
        __param(2, (0, common_1.Request)())
    ], CertificateController.prototype, "updateCertificate");
    __decorate([
        (0, swagger_1.ApiBearerAuth)(),
        (0, has_roles_decorator_1.HasRoles)("admin"),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        (0, common_1.Delete)(":id"),
        __param(0, (0, common_1.Param)("id")),
        __param(1, (0, common_1.Request)())
    ], CertificateController.prototype, "deleteCertificate");
    CertificateController = __decorate([
        (0, common_1.Controller)("certificate"),
        (0, swagger_1.ApiTags)("certificate")
    ], CertificateController);
    return CertificateController;
}());
exports.CertificateController = CertificateController;
