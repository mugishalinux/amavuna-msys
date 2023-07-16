"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResponseService = void 0;
var common_1 = require("@nestjs/common");
var response_dto_1 = require("./response.dto");
var ResponseService = /** @class */ (function () {
    function ResponseService() {
    }
    ResponseService.prototype.postResponse = function (id) {
        var response = new response_dto_1.ResponseDto();
        response.status = common_1.HttpStatus.CREATED;
        response.message = "successfully created";
        response.id = id;
        return response;
    };
    ResponseService.prototype.updateResponse = function (id) {
        var response = new response_dto_1.ResponseDto();
        response.status = common_1.HttpStatus.CREATED;
        response.message = "successfully updated";
        response.id = id;
        return response;
    };
    ResponseService.prototype.deleteResponse = function (id) {
        var response = new response_dto_1.ResponseDto();
        response.status = common_1.HttpStatus.OK;
        response.message = "successfully deleted";
        response.id = id;
        return response;
    };
    ResponseService = __decorate([
        (0, common_1.Injectable)()
    ], ResponseService);
    return ResponseService;
}());
exports.ResponseService = ResponseService;
