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
exports.Lugar = void 0;
const ciudad_entity_1 = require("../../ciudad/entities/ciudad.entity");
const imagen_entity_1 = require("../../imagenes/entities/imagen.entity");
const preferencia_usuario_entity_1 = require("../../preferencia-usuario/entities/preferencia-usuario.entity");
const typeorm_1 = require("typeorm");
let Lugar = class Lugar {
    constructor(nombre, description, puntuacion) {
        this.nombre = nombre;
        this.descripcion = description;
        this.puntuacion = puntuacion;
    }
    getIdLugar() {
        return this.id;
    }
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
};
exports.Lugar = Lugar;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Lugar.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lugar.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, length: 1500 }),
    __metadata("design:type", String)
], Lugar.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Lugar.prototype, "puntuacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'url' }),
    __metadata("design:type", String)
], Lugar.prototype, "url_image1", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'url' }),
    __metadata("design:type", String)
], Lugar.prototype, "url_image2", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'url' }),
    __metadata("design:type", String)
], Lugar.prototype, "url_image3", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'url' }),
    __metadata("design:type", String)
], Lugar.prototype, "url_image4", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ciudad_entity_1.Ciudad, (ciudad) => ciudad.lugares),
    (0, typeorm_1.JoinColumn)({ name: 'id_ciudad' }),
    __metadata("design:type", ciudad_entity_1.Ciudad)
], Lugar.prototype, "ciudad", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => imagen_entity_1.Imagen, (imagen) => imagen.lugar),
    __metadata("design:type", Array)
], Lugar.prototype, "imagenes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => preferencia_usuario_entity_1.PreferenciaUsuario, (preferenciaUsuario) => preferenciaUsuario.lugar),
    __metadata("design:type", Array)
], Lugar.prototype, "preferenciaUsuario", void 0);
exports.Lugar = Lugar = __decorate([
    (0, typeorm_1.Entity)('lugares'),
    __metadata("design:paramtypes", [String, String, Number])
], Lugar);
//# sourceMappingURL=lugar.entity.js.map