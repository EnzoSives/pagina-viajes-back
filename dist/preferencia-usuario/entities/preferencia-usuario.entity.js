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
exports.PreferenciaUsuario = void 0;
const lugar_entity_1 = require("../../lugar/entities/lugar.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let PreferenciaUsuario = class PreferenciaUsuario {
};
exports.PreferenciaUsuario = PreferenciaUsuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PreferenciaUsuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PreferenciaUsuario.prototype, "puntaje", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.preferencias),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], PreferenciaUsuario.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lugar_entity_1.Lugar, lugar => lugar.preferenciaUsuario),
    (0, typeorm_1.JoinColumn)({ name: 'lugar_id' }),
    __metadata("design:type", lugar_entity_1.Lugar)
], PreferenciaUsuario.prototype, "lugar", void 0);
exports.PreferenciaUsuario = PreferenciaUsuario = __decorate([
    (0, typeorm_1.Entity)('preferencias')
], PreferenciaUsuario);
//# sourceMappingURL=preferencia-usuario.entity.js.map