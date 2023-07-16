"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChristianRegisterDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var ChristianRegisterDto = /** @class */ (function () {
    function ChristianRegisterDto() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, swagger_1.ApiProperty)({ description: "please enter first name" })
    ], ChristianRegisterDto.prototype, "firstName");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, swagger_1.ApiProperty)({ description: "please enter last name" })
    ], ChristianRegisterDto.prototype, "lastName");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, swagger_1.ApiProperty)({ description: "please enter date of birth" })
    ], ChristianRegisterDto.prototype, "dob");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.Matches)(/(07[8,2,3,9])[0-9]{7}/, {
            message: "Primary Phone Number must be Airtel or MTN number formatted like 07*********"
        }),
        (0, swagger_1.ApiProperty)({
            description: "primary phone required"
        })
    ], ChristianRegisterDto.prototype, "phoneNumber");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, swagger_1.ApiProperty)({
            description: "user is required"
        })
    ], ChristianRegisterDto.prototype, "user");
    return ChristianRegisterDto;
}());
exports.ChristianRegisterDto = ChristianRegisterDto;
