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
exports.Post = void 0;
var user_entity_1 = require("../user/user/entity/user.entity");
var typeorm_1 = require("typeorm");
var Post = /** @class */ (function (_super) {
    __extends(Post, _super);
    function Post() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Post.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], Post.prototype, "postTitle");
    __decorate([
        (0, typeorm_1.Column)({ type: "text", nullable: true })
    ], Post.prototype, "postContent");
    __decorate([
        (0, typeorm_1.Column)()
    ], Post.prototype, "status");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], Post.prototype, "created_by");
    __decorate([
        (0, typeorm_1.Column)()
    ], Post.prototype, "updated_by");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Post.prototype, "created_at");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Post.prototype, "updated_at");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.post; })
    ], Post.prototype, "user");
    Post = __decorate([
        (0, typeorm_1.Entity)("post")
    ], Post);
    return Post;
}(typeorm_1.BaseEntity));
exports.Post = Post;
