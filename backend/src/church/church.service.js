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
exports.ChurchService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var church_entity_1 = require("./church.entity");
var ChurchService = /** @class */ (function () {
    function ChurchService(response) {
        this.response = response;
    }
    ChurchService.prototype.createChurch = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var church, data_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        church = new church_entity_1.Church();
                        church.churchName = data.churchName;
                        church.status = 1;
                        church.created_by = 1;
                        church.updated_by = 1;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, church.save()];
                    case 2:
                        data_1 = _a.sent();
                        return [2 /*return*/, this.response.postResponse(data_1.id)];
                    case 3:
                        error_1 = _a.sent();
                        throw new common_1.InternalServerErrorException("something wrong : ", error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ChurchService.prototype.updateChurch = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var church, data_2, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, church_entity_1.Church.findOne({
                            where: { status: (0, typeorm_1.Not)(8), id: id }
                        })];
                    case 1:
                        church = _a.sent();
                        if (!church)
                            throw new common_1.BadRequestException("Church with ID ".concat(id, " not found"));
                        church.churchName = data.churchName;
                        church.created_by = 1;
                        church.updated_by = 1;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, church_entity_1.Church.update(id, church)];
                    case 3:
                        data_2 = _a.sent();
                        return [2 /*return*/, this.response.postResponse(id)];
                    case 4:
                        error_2 = _a.sent();
                        throw new common_1.InternalServerErrorException("something wrong : ", error_2);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ChurchService.prototype.getAllChurch = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, church_entity_1.Church.find({
                        where: { status: (0, typeorm_1.Not)(8) }
                    })];
            });
        });
    };
    ChurchService.prototype.getSingleChurch = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var church;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, church_entity_1.Church.findOne({
                            where: { status: (0, typeorm_1.Not)(8), id: id }
                        })];
                    case 1:
                        church = _a.sent();
                        if (!church)
                            throw new common_1.BadRequestException("Church with ID ".concat(id, " not found"));
                        return [2 /*return*/, church];
                }
            });
        });
    };
    ChurchService.prototype.deleteChurch = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var church, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, church_entity_1.Church.findOne({
                            where: { status: (0, typeorm_1.Not)(8), id: id }
                        })];
                    case 1:
                        church = _a.sent();
                        if (!church)
                            throw new common_1.BadRequestException("Church with ID ".concat(id, " not found"));
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        church.status = 8;
                        return [4 /*yield*/, church_entity_1.Church.update(church.id, church)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, this.response.deleteResponse(church.id)];
                    case 4:
                        error_3 = _a.sent();
                        throw new common_1.InternalServerErrorException("something wrong : ", error_3);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ChurchService = __decorate([
        (0, common_1.Injectable)()
    ], ChurchService);
    return ChurchService;
}());
exports.ChurchService = ChurchService;
