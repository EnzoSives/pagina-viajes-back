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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContinenteService = void 0;
const common_1 = require("@nestjs/common");
const continente_entity_1 = require("./entities/continente.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ContinenteService = class ContinenteService {
    constructor(continenteRepository) {
        this.continenteRepository = continenteRepository;
    }
    async getAll() {
        return await this.continenteRepository.find();
    }
    async getId(id) {
        try {
            const criterio = { where: { id: id } };
            let continente = await this.continenteRepository.findOne(criterio);
            if (continente)
                return continente;
            else
                throw new Error(`No se encontro ciudad con id: ${id}`);
        }
        catch (error) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.NOT_FOUND, error: `500 - ERROR: ` + error }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async addContinente(continenteDTO) {
        try {
            let continente = await this.continenteRepository.save(new continente_entity_1.Continente(continenteDTO.nombre, continenteDTO.descripcion));
            if (continente)
                return continente;
            else
                throw new Error(`No se puedo agregar la ciudad`);
        }
        catch (error) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.NOT_FOUND, error: `500 - ERROR: ` + error }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async updateContinenteId(id, continenteDTO) {
        try {
            const criterio = { where: { id: id } };
            let continente = await this.continenteRepository.findOne(criterio);
            if (continente) {
                continente.setNombre(continenteDTO.nombre);
                continente = await this.continenteRepository.save(continente);
                return continente;
            }
            else {
                throw new Error(`No se pudo actualizar el id: ${id}`);
            }
        }
        catch (error) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.NOT_FOUND, error: `500 - ERROR: ` + error }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async deleteContinente(id) {
        try {
            let criterio = { where: { id: id } };
            let continente = await this.continenteRepository.findOne(criterio);
            if (!continente)
                throw new Error(`No se pudo actualizar eliminar`);
            else
                await this.continenteRepository.delete(id);
            return true;
        }
        catch (error) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.NOT_FOUND, error: `500 - ERROR: ` + error }, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.ContinenteService = ContinenteService;
exports.ContinenteService = ContinenteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(continente_entity_1.Continente)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContinenteService);
//# sourceMappingURL=continente.service.js.map