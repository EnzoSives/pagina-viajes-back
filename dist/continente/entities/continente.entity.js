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
exports.Continente = void 0;
const pais_entity_1 = require("../../pais/entities/pais.entity");
const typeorm_1 = require("typeorm");
let Continente = class Continente {
    constructor(nombre, descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
    getIdContinente() {
        return this.id;
    }
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
};
exports.Continente = Continente;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Continente.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], Continente.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], Continente.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pais_entity_1.Pais, pais => pais.continente),
    __metadata("design:type", Array)
], Continente.prototype, "paises", void 0);
exports.Continente = Continente = __decorate([
    (0, typeorm_1.Entity)('continentes'),
    __metadata("design:paramtypes", [String, String])
], Continente);
//# sourceMappingURL=continente.entity.js.map