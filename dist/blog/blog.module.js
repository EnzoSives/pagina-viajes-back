"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsModule = void 0;
const common_1 = require("@nestjs/common");
const blog_service_1 = require("./blog.service");
const blog_controller_1 = require("./blog.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const blog_entity_1 = require("./entities/blog.entity");
let BlogsModule = class BlogsModule {
};
exports.BlogsModule = BlogsModule;
exports.BlogsModule = BlogsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([blog_entity_1.Blog, user_entity_1.User])],
        controllers: [blog_controller_1.BlogsController],
        providers: [blog_service_1.BlogsService],
        exports: [blog_service_1.BlogsService]
    })
], BlogsModule);
//# sourceMappingURL=blog.module.js.map