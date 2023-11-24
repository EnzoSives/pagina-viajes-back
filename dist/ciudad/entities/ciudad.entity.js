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
exports.Ciudad = void 0;
const lugar_entity_1 = require("../../lugar/entities/lugar.entity");
const pais_entity_1 = require("../../pais/entities/pais.entity");
const typeorm_1 = require("typeorm");
let Ciudad = class Ciudad {
    constructor(nombre, descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
    getIdCiudad() {
        return this.id;
    }
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
};
exports.Ciudad = Ciudad;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Ciudad.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ciudad.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ciudad.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pais_entity_1.Pais, pais => pais.ciudades),
    (0, typeorm_1.JoinColumn)({ name: 'id_pais' }),
    __metadata("design:type", pais_entity_1.Pais)
], Ciudad.prototype, "pais", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lugar_entity_1.Lugar, lugar => lugar.ciudad),
    __metadata("design:type", Array)
], Ciudad.prototype, "lugares", void 0);
exports.Ciudad = Ciudad = __decorate([
    (0, typeorm_1.Entity)('ciudades'),
    __metadata("design:paramtypes", [String, String])
], Ciudad);
//# sourceMappingURL=ciudad.entity.js.map