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
exports.User = void 0;
var typeorm_1 = require("typeorm");
var class_transformer_1 = require("class-transformer");
var church_entity_1 = require("../../../church/church.entity");
var christian_entity_1 = require("../../../christian/entity/christian.entity");
var post_entity_1 = require("../../../post/post.entity");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], User.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], User.prototype, "lastName");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "firstName");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], User.prototype, "dob");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], User.prototype, "profilePicture");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "primaryPhone");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        (0, class_transformer_1.Exclude)()
    ], User.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "access_level");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "status");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], User.prototype, "created_by");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "updated_by");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], User.prototype, "created_at");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], User.prototype, "updated_at");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return christian_entity_1.Christian; }, function (christian) { return christian.user; })
    ], User.prototype, "christian");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return post_entity_1.Post; }, function (post) { return post.user; })
    ], User.prototype, "post");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return church_entity_1.Church; }, function (church) { return church.user; })
    ], User.prototype, "church");
    User = __decorate([
        (0, typeorm_1.Entity)("users")
    ], User);
    return User;
}(typeorm_1.BaseEntity));
exports.User = User;
