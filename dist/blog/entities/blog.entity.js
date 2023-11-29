"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let Blog = class Blog {
    constructor(posteo, nombre) {
        this.posteo = posteo;
        this.nombre = nombre;
    }
};
exports.Blog = Blog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Blog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Blog.prototype, "posteo", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'nombre' }),
    __metadata("design:type", String)
], Blog.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'nombre' }),
    __metadata("design:type", String)
], Blog.prototype, "url_imagen", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.blogs),
    (0, typeorm_1.JoinColumn)({ name: 'id_user' }),
    __metadata("design:type", user_entity_1.User)
], Blog.prototype, "user", void 0);
exports.Blog = Blog = __decorate([
    (0, typeorm_1.Entity)('blogs'),
    __metadata("design:paramtypes", [String, String])
], Blog);
//# sourceMappingURL=blog.entity.js.map