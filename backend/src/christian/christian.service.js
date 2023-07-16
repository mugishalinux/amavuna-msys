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
exports.ChristianService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var christian_entity_1 = require("./entity/christian.entity");
var user_entity_1 = require("../user/user/entity/user.entity");
var faker = require("faker");
var ChristianService = /** @class */ (function () {
    function ChristianService(response, certificateService) {
        this.response = response;
        this.certificateService = certificateService;
    }
    ChristianService.prototype.createChristian = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var christian, user, data_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        christian = new christian_entity_1.Christian();
                        christian.firstName = data.firstName;
                        christian.lastName = data.lastName;
                        christian.dob = data.dob;
                        christian.primaryPhone = data.phoneNumber;
                        christian.status = 1;
                        christian.created_by = 1;
                        christian.updated_by = 1;
                        return [4 /*yield*/, user_entity_1.User.findOne({
                                where: { id: data.user }
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new common_1.BadRequestException("This user ".concat(data.user, " not found"));
                        christian.user = user;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, christian.save()];
                    case 3:
                        data_1 = _a.sent();
                        return [4 /*yield*/, this.certificateService.createCertificate(data_1.id)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, this.response.postResponse(data_1.id)];
                    case 5:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw new common_1.InternalServerErrorException("something wrong : ", error_1);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ChristianService.prototype.updateChristian = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var christian, data_2, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, christian_entity_1.Christian.findOne({
                            where: { id: id }
                        })];
                    case 1:
                        christian = _a.sent();
                        if (!christian)
                            throw new common_1.BadRequestException("This christian ".concat(id, " not found"));
                        christian.firstName = data.firstName;
                        christian.lastName = data.lastName;
                        christian.dob = data.dob;
                        christian.primaryPhone = data.phoneNumber;
                        christian.status = 1;
                        christian.created_by = 1;
                        christian.updated_by = 1;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, christian_entity_1.Christian.update(id, christian)];
                    case 3:
                        data_2 = _a.sent();
                        return [2 /*return*/, this.response.updateResponse(id)];
                    case 4:
                        error_2 = _a.sent();
                        throw new common_1.InternalServerErrorException("something wrong : ", error_2);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ChristianService.prototype.getAllchristians = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, christian_entity_1.Christian.find({
                        where: { status: (0, typeorm_1.Not)(8) }
                    })];
            });
        });
    };
    ChristianService.prototype.getAllChristianByChruchElder = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, christian_entity_1.Christian.find({
                        where: { status: (0, typeorm_1.Not)(8), user: { id: id } }
                    })];
            });
        });
    };
    ChristianService.prototype.getSingleChristian = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var christian;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, christian_entity_1.Christian.findOne({
                            where: { status: (0, typeorm_1.Not)(8), id: id }
                        })];
                    case 1:
                        christian = _a.sent();
                        if (!christian)
                            throw new common_1.BadRequestException("This christian ".concat(id, " not found"));
                        return [2 /*return*/, christian];
                }
            });
        });
    };
    ChristianService.prototype.deletechristian = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var christian, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, christian_entity_1.Christian.findOne({
                            where: { status: (0, typeorm_1.Not)(8), id: id }
                        })];
                    case 1:
                        christian = _a.sent();
                        if (!christian)
                            throw new common_1.BadRequestException("This christian ".concat(id, " not found"));
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        christian.status = 8;
                        return [4 /*yield*/, christian_entity_1.Christian.update(id, christian)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, this.response.deleteResponse(id)];
                    case 4:
                        error_3 = _a.sent();
                        throw new common_1.InternalServerErrorException("something wrong : ", error_3);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ChristianService.prototype.allowChristianBaptism = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var christian, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, christian_entity_1.Christian.findOne({
                            where: { status: (0, typeorm_1.Not)(8), id: id }
                        })];
                    case 1:
                        christian = _a.sent();
                        if (!christian)
                            throw new common_1.BadRequestException("This christian ".concat(id, " not found"));
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        christian.isBaptised = true;
                        return [4 /*yield*/, christian_entity_1.Christian.update(id, christian)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, this.response.deleteResponse(id)];
                    case 4:
                        error_4 = _a.sent();
                        throw new common_1.InternalServerErrorException("something wrong : ", error_4);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ChristianService.prototype.disAllowChristianBaptism = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var christian, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, christian_entity_1.Christian.findOne({
                            where: { status: (0, typeorm_1.Not)(8), id: id }
                        })];
                    case 1:
                        christian = _a.sent();
                        if (!christian)
                            throw new common_1.BadRequestException("This christian ".concat(id, " not found"));
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        christian.isBaptised = false;
                        return [4 /*yield*/, christian_entity_1.Christian.update(id, christian)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, this.response.deleteResponse(id)];
                    case 4:
                        error_5 = _a.sent();
                        throw new common_1.InternalServerErrorException("something wrong : ", error_5);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ChristianService.prototype.createRandomChristians = function () {
        return __awaiter(this, void 0, void 0, function () {
            var totalRows, userIDs, christianRepository, i, christian, randomUserID, user, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        totalRows = 1500;
                        userIDs = [4, 5, 6, 7, 8, 9, 10];
                        christianRepository = getRepository(christian_entity_1.Christian);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < totalRows)) return [3 /*break*/, 7];
                        christian = new christian_entity_1.Christian();
                        christian.firstName = faker.name.firstName();
                        christian.lastName = faker.name.lastName();
                        christian.dob = faker.date.between('1970-01-01', '2003-12-31'); // Random date of birth between 1970 and 2003
                        christian.primaryPhone = faker.phone.phoneNumber();
                        christian.status = 1;
                        christian.created_by = 1;
                        christian.updated_by = 1;
                        randomUserID = faker.random.arrayElement(userIDs);
                        return [4 /*yield*/, userRepository.findOne(randomUserID)];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("User with ID ".concat(randomUserID, " not found"));
                        }
                        christian.user = user;
                        christian.created_at = faker.date.between(new Date(), faker.date.past(5 * 30)); // Random date between now and 5 months ago
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, christianRepository.save(christian)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_6 = _a.sent();
                        console.error('Error while creating Christian:', error_6.message);
                        return [3 /*break*/, 6];
                    case 6:
                        i++;
                        return [3 /*break*/, 1];
                    case 7:
                        console.log('Random Christians created successfully!');
                        return [2 /*return*/];
                }
            });
        });
    };
    ChristianService = __decorate([
        (0, common_1.Injectable)()
    ], ChristianService);
    return ChristianService;
}());
exports.ChristianService = ChristianService;
