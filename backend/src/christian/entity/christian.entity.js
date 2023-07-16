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
exports.Christian = void 0;
var certificate_entity_1 = require("../../certificates/entity/certificate.entity");
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../user/user/entity/user.entity");
var Christian = /** @class */ (function (_super) {
    __extends(Christian, _super);
    function Christian() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Christian.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], Christian.prototype, "lastName");
    __decorate([
        (0, typeorm_1.Column)()
    ], Christian.prototype, "firstName");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], Christian.prototype, "dob");
    __decorate([
        (0, typeorm_1.Column)()
    ], Christian.prototype, "primaryPhone");
    __decorate([
        (0, typeorm_1.Column)({ "default": false })
    ], Christian.prototype, "isBaptised");
    __decorate([
        (0, typeorm_1.Column)()
    ], Christian.prototype, "status");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], Christian.prototype, "created_by");
    __decorate([
        (0, typeorm_1.Column)()
    ], Christian.prototype, "updated_by");
    __decorate([
        (0, typeorm_1.Column)()
    ], Christian.prototype, "created_at");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Christian.prototype, "updated_at");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return certificate_entity_1.Certificate; }, function (certificate) { return certificate.victim; }) // specify inverse side as a second parameter
    ], Christian.prototype, "certificate");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.christian; })
    ], Christian.prototype, "user");
    Christian = __decorate([
        (0, typeorm_1.Entity)("christian")
    ], Christian);
    return Christian;
}(typeorm_1.BaseEntity));
exports.Christian = Christian;
