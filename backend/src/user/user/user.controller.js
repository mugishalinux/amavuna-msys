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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UserController = void 0;
var common_1 = require("@nestjs/common");
var user_entity_1 = require("./entity/user.entity");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
var has_roles_decorator_1 = require("../../auth/has-roles.decorator");
var UserController = /** @class */ (function () {
    function UserController(userService, authService, filter, jwtService) {
        this.userService = userService;
        this.authService = authService;
        this.filter = filter;
        this.jwtService = jwtService;
    }
    UserController.prototype.createChurchElder = function (userDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                userDto.access_level = "churchelder";
                return [2 /*return*/, this.userService.createUsers(userDto)];
            });
        });
    };
    UserController.prototype.createAdmin = function (userDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                userDto.access_level = "admin";
                return [2 /*return*/, this.userService.createUsers(userDto)];
            });
        });
    };
    UserController.prototype.updateUserInfo = function (id, userDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userService.upadateUserInfo(id, userDto)];
            });
        });
    };
    UserController.prototype.activateChurchElder = function (req, id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_entity_1.User.findOne({
                            where: { id: req.user.userId }
                        })];
                    case 1:
                        user = _a.sent();
                        try {
                            if (user.access_level == "churchelder") {
                                console.log(user);
                                throw new common_1.ForbiddenException("You are not allowed activate account");
                            }
                        }
                        catch (e) {
                            console.log(e);
                        }
                        return [2 /*return*/, this.userService.approveSkipperAccount(id)];
                }
            });
        });
    };
    UserController.prototype.disableChurchElder = function (req, id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_entity_1.User.findOne({
                            where: { id: req.user.userId }
                        })];
                    case 1:
                        user = _a.sent();
                        if (user.access_level == "churchelder") {
                            console.log(user);
                            throw new common_1.ForbiddenException("You are not allowed activate account");
                        }
                        return [2 /*return*/, this.userService.disableSkipperAccount(id)];
                }
            });
        });
    };
    UserController.prototype.updatePassword = function (id, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userService.updatingPassword(id, password)];
            });
        });
    };
    UserController.prototype.getAllChurchElder = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userService.getAllUsers()];
            });
        });
    };
    UserController.prototype.getSingleUserById = function (id) {
        return this.userService.getSingleUser(id);
    };
    UserController.prototype.getAllUser = function () {
        return this.userService.getAllUsers();
    };
    UserController.prototype.deleteUser = function (id) {
        return this.userService.deleteUser(id);
    };
    UserController.prototype.forgetPassword = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userService.forgetPassword(userData)];
            });
        });
    };
    UserController.prototype.login = function (loginDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user, data, payload, jwtToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.validateUser(loginDto.phone, loginDto.password)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.UnauthorizedException("Invalid credentials");
                        }
                        return [4 /*yield*/, user_entity_1.User.findOne({ where: { id: user.id } })];
                    case 2:
                        data = _a.sent();
                        payload = { id: user.id, names: user.names };
                        return [4 /*yield*/, this.jwtService.signAsync(payload, {
                                secret: process.env.JWT_SECRET
                            })];
                    case 3:
                        jwtToken = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve) {
                                setTimeout(function () {
                                    resolve({
                                        id: user.id,
                                        names: user.names,
                                        phone: user.primaryPhone,
                                        access_level: user.access_level,
                                        profile: user.profilePicture,
                                        jwtToken: jwtToken
                                    });
                                }, 0); // Delay the response by 3 seconds
                            })];
                }
            });
        });
    };
    __decorate([
        (0, common_1.Post)("createMentor"),
        (0, swagger_1.ApiBearerAuth)(),
        __param(0, (0, common_1.Body)())
    ], UserController.prototype, "createChurchElder");
    __decorate([
        (0, common_1.Post)("createAdmin"),
        (0, swagger_1.ApiBearerAuth)(),
        __param(0, (0, common_1.Body)())
    ], UserController.prototype, "createAdmin");
    __decorate([
        (0, has_roles_decorator_1.HasRoles)("admin"),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Put)("updateUserInfo/:id"),
        (0, swagger_1.ApiBearerAuth)(),
        __param(0, (0, common_1.Param)("id")),
        __param(1, (0, common_1.Body)())
    ], UserController.prototype, "updateUserInfo");
    __decorate([
        (0, swagger_1.ApiBearerAuth)(),
        (0, has_roles_decorator_1.HasRoles)("admin"),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Put)("activateMentorAccount/:id"),
        (0, swagger_1.ApiBearerAuth)(),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Param)("id"))
    ], UserController.prototype, "activateChurchElder");
    __decorate([
        (0, swagger_1.ApiBearerAuth)(),
        (0, has_roles_decorator_1.HasRoles)("admin"),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Put)("disableMentorAccount/:id"),
        (0, swagger_1.ApiBearerAuth)(),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Param)("id"))
    ], UserController.prototype, "disableChurchElder");
    __decorate([
        (0, common_1.Post)("updatingPassword/id/:id/password/:password"),
        (0, swagger_1.ApiBearerAuth)(),
        __param(0, (0, common_1.Param)("id")),
        __param(1, (0, common_1.Param)("password"))
    ], UserController.prototype, "updatePassword");
    __decorate([
        (0, swagger_1.ApiBearerAuth)(),
        (0, has_roles_decorator_1.HasRoles)("admin"),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Get)("/getAllMentor"),
        __param(0, (0, common_1.Request)())
    ], UserController.prototype, "getAllChurchElder");
    __decorate([
        (0, swagger_1.ApiBearerAuth)(),
        (0, has_roles_decorator_1.HasRoles)("admin"),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Get)(":id"),
        __param(0, (0, common_1.Param)("id"))
    ], UserController.prototype, "getSingleUserById");
    __decorate([
        (0, swagger_1.ApiBearerAuth)(),
        (0, has_roles_decorator_1.HasRoles)("admin"),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Get)("")
    ], UserController.prototype, "getAllUser");
    __decorate([
        (0, swagger_1.ApiBearerAuth)(),
        (0, has_roles_decorator_1.HasRoles)("admin"),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Delete)(":id"),
        __param(0, (0, common_1.Param)("id"))
    ], UserController.prototype, "deleteUser");
    __decorate([
        (0, common_1.Post)("forget/password"),
        (0, swagger_1.ApiBearerAuth)(),
        __param(0, (0, common_1.Body)())
    ], UserController.prototype, "forgetPassword");
    __decorate([
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.Post)("auth/login/user"),
        __param(0, (0, common_1.Body)())
    ], UserController.prototype, "login");
    UserController = __decorate([
        (0, common_1.Controller)("user"),
        (0, swagger_1.ApiTags)("user")
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
