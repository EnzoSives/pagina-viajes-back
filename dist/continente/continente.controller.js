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
exports.ContinenteController = void 0;
const common_1 = require("@nestjs/common");
const continente_service_1 = require("./continente.service");
const create_continente_dto_1 = require("./dto/create-continente.dto");
let ContinenteController = class ContinenteController {
    constructor(continenteService) {
        this.continenteService = continenteService;
    }
    async getCont() {
        return this.continenteService.getAll();
    }
    async getId(id) {
        return this.continenteService.getId(id);
    }
    addCiudad(continente) {
        return this.continenteService.addContinente(continente);
    }
    updateCiudadId(id, continente) {
        return this.continenteService.updateContinenteId(id, continente);
    }
    deleteCiudad(id) {
        return this.continenteService.deleteContinente(id);
    }
};
exports.ContinenteController = ContinenteController;
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContinenteController.prototype, "getCont", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContinenteController.prototype, "getId", null);
__decorate([
    (0, common_1.Post)('crear'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_continente_dto_1.ContinenteDTO]),
    __metadata("design:returntype", Promise)
], ContinenteController.prototype, "addCiudad", null);
__decorate([
    (0, common_1.Put)('actualizar/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_continente_dto_1.ContinenteDTO]),
    __metadata("design:returntype", Promise)
], ContinenteController.prototype, "updateCiudadId", null);
__decorate([
    (0, common_1.Delete)('eliminar/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContinenteController.prototype, "deleteCiudad", null);
exports.ContinenteController = ContinenteController = __decorate([
    (0, common_1.Controller)('continente'),
    __metadata("design:paramtypes", [continente_service_1.ContinenteService])
], ContinenteController);
//# sourceMappingURL=continente.controller.js.map