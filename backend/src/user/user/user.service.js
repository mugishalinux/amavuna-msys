"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var user_entity_1 = require("./entity/user.entity");
var typeorm_1 = require("typeorm");
var bcrypt = require("bcrypt");
var church_entity_1 = require("../../church/church.entity");
var UserService = /** @class */ (function () {
    function UserService(response) {
        this.response = response;
    }
    UserService.prototype.createUsers = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var church, user, primaryPhone, salt, hashedPassword, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, church_entity_1.Church.findOne({
                            where: { status: (0, typeorm_1.Not)(8), id: userData.church }
                        })];
                    case 1:
                        church = _a.sent();
                        if (!church)
                            throw new common_1.BadRequestException("Church with ID ".concat(userData.church, " not found"));
                        user = new user_entity_1.User();
                        return [4 /*yield*/, user_entity_1.User.findOne({
                                where: { primaryPhone: userData.phoneNumber, status: (0, typeorm_1.Not)(8) }
                            })];
                    case 2:
                        primaryPhone = _a.sent();
                        if (primaryPhone)
                            throw new common_1.BadRequestException("This phone number ".concat(userData.phoneNumber, " already taken"));
                        user.church = church;
                        user.firstName = userData.firstName;
                        user.lastName = userData.lastName;
                        user.dob = userData.dob;
                        user.primaryPhone = userData.phoneNumber;
                        user.access_level = userData.access_level;
                        user.status = 2;
                        user.created_by = 1;
                        user.updated_by = 1;
                        user.profilePicture = userData.profilePicture;
                        return [4 /*yield*/, bcrypt.genSalt()];
                    case 3:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt.hash(userData.password, 12)];
                    case 4:
                        hashedPassword = _a.sent();
                        user.password = hashedPassword;
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, user.save()];
                    case 6:
                        data = _a.sent();
                        return [2 /*return*/, this.response.postResponse(data.id)];
                    case 7:
                        error_1 = _a.sent();
                        throw new common_1.InternalServerErrorException("something wrong : ", error_1);
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, user_entity_1.User.find({
                        where: { status: (0, typeorm_1.Not)(8) },
                        relations: ["church"]
                    })];
            });
        });
    };
    UserService.prototype.getSingleUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_entity_1.User.findOne({
                            where: { status: (0, typeorm_1.Not)(8), id: id },
                            relations: ["church"]
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new common_1.BadRequestException("User with ID ".concat(id, " not found"));
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.upadateUserInfo = function (id, userData) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isPhoneExist, church, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_entity_1.User.findOne({
                            where: { id: id }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new common_1.BadRequestException("User with ID: ".concat(id, " not found"));
                        return [4 /*yield*/, user_entity_1.User.findOne({
                                where: { id: (0, typeorm_1.Not)(id), primaryPhone: userData.phoneNumber }
                            })];
                    case 2:
                        isPhoneExist = _a.sent();
                        if (isPhoneExist)
                            throw new common_1.BadRequestException("Phone number ".concat(userData.phoneNumber, " already exist "));
                        return [4 /*yield*/, church_entity_1.Church.findOne({
                                where: { status: (0, typeorm_1.Not)(8), id: userData.church }
                            })];
                    case 3:
                        church = _a.sent();
                        if (!church)
                            throw new common_1.BadRequestException("Church with ID ".concat(userData.church, " not found"));
                        user.church = church;
                        user.firstName = userData.firstName;
                        user.lastName = userData.lastName;
                        user.primaryPhone = userData.phoneNumber;
                        user.dob = userData.dob;
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, user_entity_1.User.update(id, user)];
                    case 5:
                        data = _a.sent();
                        return [2 /*return*/, this.response.updateResponse(id)];
                    case 6:
                        error_2 = _a.sent();
                        throw new common_1.InternalServerErrorException("something wrong : ", error_2);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.approveSkipperAccount = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_entity_1.User.findOne({
                            where: { id: id }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new common_1.BadRequestException("User with ID: ".concat(id, " not found"));
                        user.status = 1;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, user_entity_1.User.update(id, user)];
                    case 3:
                        data = _a.sent();
                        return [2 /*return*/, this.response.updateResponse(id)];
                    case 4:
                        error_3 = _a.sent();
                        throw new common_1.InternalServerErrorException("something wrong : ", error_3);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.disableSkipperAccount = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, data, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_entity_1.User.findOne({
                            where: { id: id }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new common_1.BadRequestException("User with ID: ".concat(id, " not found"));
                        user.status = 2;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, user_entity_1.User.update(id, user)];
                    case 3:
                        data = _a.sent();
                        return [2 /*return*/, this.response.updateResponse(id)];
                    case 4:
                        error_4 = _a.sent();
                        throw new common_1.InternalServerErrorException("something wrong : ", error_4);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.forgetPassword = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var user, yearOfBirth, salt, hashedPassword, data, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_entity_1.User.findOne({
                            where: { primaryPhone: userData.phoneNumber }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new common_1.BadRequestException("User with Phone number: ".concat(userData.phoneNumber, " not found"));
                        yearOfBirth = user.dob.getFullYear();
                        if (!(yearOfBirth == userData.dob)) return [3 /*break*/, 8];
                        return [4 /*yield*/, bcrypt.genSalt()];
                    case 2:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt.hash(userData.password, 12)];
                    case 3:
                        hashedPassword = _a.sent();
                        user.password = hashedPassword;
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, user_entity_1.User.update(user.id, user)];
                    case 5:
                        data = _a.sent();
                        return [2 /*return*/, this.response.updateResponse(user.id)];
                    case 6:
                        error_5 = _a.sent();
                        throw new common_1.InternalServerErrorException("something wrong : ", error_5);
                    case 7: return [3 /*break*/, 9];
                    case 8: return [2 /*return*/, {
                            statusCode: 400,
                            message: "You provided incorrect year of birth"
                        }];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.updatingPassword = function (id, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, salt, hashedPassword, data, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_entity_1.User.findOne({
                            where: { id: id }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new common_1.BadRequestException("User with Phone number ".concat(id, " not found"));
                        return [4 /*yield*/, bcrypt.genSalt()];
                    case 2:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt.hash(password, 12)];
                    case 3:
                        hashedPassword = _a.sent();
                        user.password = hashedPassword;
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, user_entity_1.User.update(user.id, user)];
                    case 5:
                        data = _a.sent();
                        return [2 /*return*/, this.response.postResponse(user.id)];
                    case 6:
                        error_6 = _a.sent();
                        throw new common_1.InternalServerErrorException("something wrong : ", error_6);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_entity_1.User.findOne({ where: { status: (0, typeorm_1.Not)(8), id: id } })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new common_1.BadRequestException("User with ID ".concat(id, " not found"));
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        user.status = 8;
                        return [4 /*yield*/, user_entity_1.User.update(user.id, user)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, this.response.deleteResponse(user.id)];
                    case 4:
                        error_7 = _a.sent();
                        throw new common_1.InternalServerErrorException("something wrong : ", error_7);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.findUserByPhoneBeforeCreateUser = function (phone) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_entity_1.User.findOne({
                            where: { primaryPhone: phone, status: (0, typeorm_1.Not)(8) }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.findUserByPhone = function (phone) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_entity_1.User.findOne({
                            where: { primaryPhone: phone, status: (0, typeorm_1.Not)(8) }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new common_1.BadRequestException("This account doesn't ".concat(phone, " exist"));
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService = __decorate([
        (0, common_1.Injectable)()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
