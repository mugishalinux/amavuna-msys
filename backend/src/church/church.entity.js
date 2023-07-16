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
exports.Church = void 0;
var user_entity_1 = require("../user/user/entity/user.entity");
var typeorm_1 = require("typeorm");
var Church = /** @class */ (function (_super) {
    __extends(Church, _super);
    function Church() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Church.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], Church.prototype, "churchName");
    __decorate([
        (0, typeorm_1.Column)()
    ], Church.prototype, "status");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], Church.prototype, "created_by");
    __decorate([
        (0, typeorm_1.Column)()
    ], Church.prototype, "updated_by");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Church.prototype, "created_at");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Church.prototype, "updated_at");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return user_entity_1.User; }, function (user) { return user.church; }) // specify inverse side as a second parameter
    ], Church.prototype, "user");
    Church = __decorate([
        (0, typeorm_1.Entity)("church")
    ], Church);
    return Church;
}(typeorm_1.BaseEntity));
exports.Church = Church;
