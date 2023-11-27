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
exports.Pais = void 0;
const ciudad_entity_1 = require("../../ciudad/entities/ciudad.entity");
const continente_entity_1 = require("../../continente/entities/continente.entity");
const typeorm_1 = require("typeorm");
let Pais = class Pais {
    constructor(nombre, descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
    getIdPais() {
        return this.id;
    }
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
};
exports.Pais = Pais;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Pais.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], Pais.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], Pais.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'url' }),
    __metadata("design:type", String)
], Pais.prototype, "url_image1", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'url' }),
    __metadata("design:type", String)
], Pais.prototype, "url_image2", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'url' }),
    __metadata("design:type", String)
], Pais.prototype, "url_image3", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'url' }),
    __metadata("design:type", String)
], Pais.prototype, "url_image4", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ciudad_entity_1.Ciudad, ciudad => ciudad.pais),
    __metadata("design:type", Array)
], Pais.prototype, "ciudades", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => continente_entity_1.Continente, continente => continente.paises),
    (0, typeorm_1.JoinColumn)({ name: 'id_continente' }),
    __metadata("design:type", continente_entity_1.Continente)
], Pais.prototype, "continente", void 0);
exports.Pais = Pais = __decorate([
    (0, typeorm_1.Entity)('paises'),
    __metadata("design:paramtypes", [String, String])
], Pais);
//# sourceMappingURL=pais.entity.js.map