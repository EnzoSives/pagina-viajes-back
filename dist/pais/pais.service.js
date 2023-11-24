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
exports.PaisService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pais_entity_1 = require("./entities/pais.entity");
const continente_entity_1 = require("../continente/entities/continente.entity");
let PaisService = class PaisService {
    constructor(paisRepository, continenteRepository) {
        this.paisRepository = paisRepository;
        this.continenteRepository = continenteRepository;
    }
    async getAll() {
        return await this.paisRepository.find();
    }
    async getId(id) {
        try {
            const criterio = { where: { id: id } };
            let pais = await this.paisRepository.findOne(criterio);
            if (pais)
                return pais;
            else
                throw new Error(`No se encontro ciudad con id: ${id}`);
        }
        catch (error) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.NOT_FOUND, error: `500 - ERROR: ` + error }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async addPais(paisDTO) {
        try {
            let pais = new pais_entity_1.Pais(paisDTO.nombre, paisDTO.descripcion, paisDTO.url_image, paisDTO.puntuacion);
            pais.continente = await this.continenteRepository.findOne({ where: { id: paisDTO.id_continente } });
            if (pais)
                return await this.paisRepository.save(pais);
            else
                throw new Error(`No se puedo agregar la ciudad`);
        }
        catch (error) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.NOT_FOUND, error: `500 - ERROR: ` + error }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async updatePaisId(id, paisDTO) {
        try {
            const criterio = { where: { id: id } };
            let pais = await this.paisRepository.findOne(criterio);
            if (pais) {
                pais.setNombre(paisDTO.nombre);
                pais = await this.paisRepository.save(pais);
                return pais;
            }
            else {
                throw new Error(`No se pudo actualizar el id: ${id}`);
            }
        }
        catch (error) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.NOT_FOUND, error: `500 - ERROR: ` + error }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async deletePais(id) {
        try {
            let criterio = { where: { id: id } };
            let pais = await this.paisRepository.findOne(criterio);
            if (!pais)
                throw new Error(`No se pudo actualizar eliminar`);
            else
                await this.paisRepository.delete(id);
            return true;
        }
        catch (error) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.NOT_FOUND, error: `500 - ERROR: ` + error }, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.PaisService = PaisService;
exports.PaisService = PaisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pais_entity_1.Pais)),
    __param(1, (0, typeorm_1.InjectRepository)(continente_entity_1.Continente)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PaisService);
//# sourceMappingURL=pais.service.js.map