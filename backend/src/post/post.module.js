"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostModule = void 0;
var common_1 = require("@nestjs/common");
var auth_module_1 = require("../auth/auth.module");
var jwt_1 = require("@nestjs/jwt");
var response_module_1 = require("../response/response.module");
var filter_helper_1 = require("../helpers/filter.helper");
var user_service_1 = require("../user/user/user.service");
var church_controller_1 = require("../church/church.controller");
var church_service_1 = require("../church/church.service");
var post_service_1 = require("./post.service");
var post_controller_1 = require("./post.controller");
var send_post_controller_1 = require("./send.post.controller");
var send_post_1 = require("./send.post");
var PostModule = /** @class */ (function () {
    function PostModule() {
    }
    PostModule = __decorate([
        (0, common_1.Module)({
            imports: [(0, common_1.forwardRef)(function () { return auth_module_1.AuthModule; }), response_module_1.ResponseModule],
            controllers: [church_controller_1.ChurchController, post_controller_1.PostController, send_post_controller_1.SendPostController],
            providers: [
                user_service_1.UserService,
                send_post_1.SendPostService,
                post_service_1.PostService,
                church_service_1.ChurchService,
                jwt_1.JwtService,
                filter_helper_1.FilterHelper,
            ],
            exports: []
        })
    ], PostModule);
    return PostModule;
}());
exports.PostModule = PostModule;
