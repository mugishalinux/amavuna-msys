"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SubscriberDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var SubscriberDto = /** @class */ (function (_super) {
    __extends(SubscriberDto, _super);
    function SubscriberDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, swagger_1.ApiProperty)({
            description: "names required"
        })
    ], SubscriberDto.prototype, "names");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, swagger_1.ApiProperty)({
            description: "province id required"
        })
    ], SubscriberDto.prototype, "province");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: "district id required"
        })
    ], SubscriberDto.prototype, "district");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: "sector id required"
        })
    ], SubscriberDto.prototype, "sector");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: "cell id required"
        })
    ], SubscriberDto.prototype, "cell");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: "village id required"
        })
    ], SubscriberDto.prototype, "village");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, swagger_1.ApiProperty)({
            description: "martial status required"
        })
    ], SubscriberDto.prototype, "martialStatus");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, swagger_1.ApiProperty)({
            description: "number of childreen required"
        })
    ], SubscriberDto.prototype, "childreenNumber");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.Matches)(/(07[8,2,3,9])[0-9]{7}/, {
            message: "Primary Phone Number must be Airtel or MTN number formatted like 07*********"
        }),
        (0, swagger_1.ApiProperty)({
            description: "primary phone required"
        })
    ], SubscriberDto.prototype, "primaryPhone");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.Matches)(/(07[8,2,3,9])[0-9]{7}/, {
            message: "Secondary Phone Number must be Airtel or MTN number formatted like 07*********"
        }),
        (0, swagger_1.ApiProperty)({
            description: "secondary phone"
        })
    ], SubscriberDto.prototype, "secondaryPhone");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, swagger_1.ApiProperty)({
            description: "choose receive two or one message on daily basis"
        })
    ], SubscriberDto.prototype, "messageNumber");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, swagger_1.ApiProperty)({
            description: "user role required"
        })
    ], SubscriberDto.prototype, "access_level");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, swagger_1.ApiProperty)({
            description: "password required"
        })
    ], SubscriberDto.prototype, "password");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, swagger_1.ApiProperty)({
            description: "time of receiving message"
        })
    ], SubscriberDto.prototype, "messageTime");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, swagger_1.ApiProperty)({
            description: "husband get message yes or no"
        })
    ], SubscriberDto.prototype, "bothReceiveMessage");
    return SubscriberDto;
}(typeorm_1.BaseEntity));
exports.SubscriberDto = SubscriberDto;
