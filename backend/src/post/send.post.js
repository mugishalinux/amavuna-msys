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
exports.SendPostService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var post_entity_1 = require("./post.entity");
var TeleSignSDK = require("telesignsdk");
var christian_entity_1 = require("../christian/entity/christian.entity");
var SendPostService = /** @class */ (function () {
    function SendPostService() {
        this.customerId = "F27EB590-26DE-4986-A385-FC6B8AEB7136";
        this.apiKey = "TA9XUtIVNJ+liARGDLs0DVaIJ6a9vCzEocInXb6XvfOdt12MCqfjD8uod9LMrZOg48mU5uLDeRsybq2IiGe0pA==";
        this.restEndpoint = "https://rest-api.telesign.com";
        this.timeout = 10 * 1000; // 10 secs
        this.client = new TeleSignSDK(this.customerId, this.apiKey, this.restEndpoint, this.timeout);
    }
    SendPostService.prototype.getSendPost = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var post, christian, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, post_entity_1.Post.findOne({
                            where: { status: (0, typeorm_1.Not)(8), id: data.post }
                        })];
                    case 1:
                        post = _a.sent();
                        return [4 /*yield*/, christian_entity_1.Christian.find({
                                where: { status: (0, typeorm_1.Not)(8), user: { id: data.user } }
                            })];
                    case 2:
                        christian = _a.sent();
                        i = 0;
                        for (i = 0; i < christian.length; i++) {
                            function messageCallback(error, responseBody) {
                                if (error === null) {
                                    console.log("".concat(post[i].postContent, ": ").concat(christian[i].primaryPhone) +
                                        " => code: ".concat(responseBody["status"]["code"]) +
                                        ", description: ".concat(responseBody["status"]["description"]));
                                }
                                else {
                                    console.error("Unable to send message. " + error);
                                }
                            }
                            this.client.sms.message(messageCallback, christian[i].primaryPhone, post[i].postContent, "ARN");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SendPostService = __decorate([
        (0, common_1.Injectable)()
    ], SendPostService);
    return SendPostService;
}());
exports.SendPostService = SendPostService;
