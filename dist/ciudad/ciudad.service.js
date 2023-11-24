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
exports.CiudadService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ciudad_entity_1 = require("./entities/ciudad.entity");
const pais_entity_1 = require("../pais/entities/pais.entity");
let CiudadService = class CiudadService {
    constructor(ciudadRepository, paisRepository) {
        this.ciudadRepository = ciudadRepository;
        this.paisRepository = paisRepository;
    }
    async getAll() {
        return await this.ciudadRepository.find();
    }
    async getId(id) {
        try {
            const criterio = { where: { id: id } };
            let ciudad = await this.ciudadRepository.findOne(criterio);
            if (ciudad)
                return ciudad;
            else
                throw new Error(`No se encontro ciudad con id: ${id}`);
        }
        catch (error) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.NOT_FOUND, error: `500 - ERROR: ` + error }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async addCiudad(ciudadDTO) {
        try {
            let ciudad = new ciudad_entity_1.Ciudad(ciudadDTO.nombre, ciudadDTO.descripcion);
            ciudad.pais = await this.paisRepository.findOne({ where: { id: ciudadDTO.id_pais } });
            if (ciudad) {
                return await this.ciudadRepository.save(ciudad);
            }
            else
                throw new Error(`No se puedo agregar la ciudad`);
        }
        catch (error) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.NOT_FOUND, error: `500 - ERROR: ` + error }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async updateCiudadId(id, ciudadDTO) {
        try {
            const criterio = { where: { id: id } };
            let ciudad = await this.ciudadRepository.findOne(criterio);
            if (ciudad) {
                ciudad.setNombre(ciudadDTO.nombre);
                ciudad = await this.ciudadRepository.save(ciudad);
                return ciudad;
            }
            else {
                throw new Error(`No se pudo actualizar el id: ${id}`);
            }
        }
        catch (error) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.NOT_FOUND, error: `500 - ERROR: ` + error }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async deleteCiudad(id) {
        try {
            let criterio = { where: { id: id } };
            let ciudad = await this.ciudadRepository.findOne(criterio);
            if (!ciudad)
                throw new Error(`No se pudo actualizar eliminar`);
            else
                await this.ciudadRepository.delete(id);
            return true;
        }
        catch (error) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.NOT_FOUND, error: `500 - ERROR: ` + error }, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.CiudadService = CiudadService;
exports.CiudadService = CiudadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ciudad_entity_1.Ciudad)),
    __param(1, (0, typeorm_1.InjectRepository)(pais_entity_1.Pais)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CiudadService);
//# sourceMappingURL=ciudad.service.js.map