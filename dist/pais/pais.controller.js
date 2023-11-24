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
exports.PaisController = void 0;
const common_1 = require("@nestjs/common");
const pais_service_1 = require("./pais.service");
const create_pais_dto_1 = require("./dto/create-pais.dto");
let PaisController = class PaisController {
    constructor(paisService) {
        this.paisService = paisService;
    }
    async getLugares() {
        return this.paisService.getAll();
    }
    async getId(id) {
        return this.paisService.getId(id);
    }
    addPais(pais) {
        return this.paisService.addPais(pais);
    }
    updatePaisId(id, pais) {
        return this.paisService.updatePaisId(id, pais);
    }
    deletePais(id) {
        return this.paisService.deletePais(id);
    }
};
exports.PaisController = PaisController;
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaisController.prototype, "getLugares", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaisController.prototype, "getId", null);
__decorate([
    (0, common_1.Post)('crear'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pais_dto_1.PaisDTO]),
    __metadata("design:returntype", Promise)
], PaisController.prototype, "addPais", null);
__decorate([
    (0, common_1.Put)('actualizar/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_pais_dto_1.PaisDTO]),
    __metadata("design:returntype", Promise)
], PaisController.prototype, "updatePaisId", null);
__decorate([
    (0, common_1.Delete)('eliminar/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaisController.prototype, "deletePais", null);
exports.PaisController = PaisController = __decorate([
    (0, common_1.Controller)('pais'),
    __metadata("design:paramtypes", [pais_service_1.PaisService])
], PaisController);
//# sourceMappingURL=pais.controller.js.map