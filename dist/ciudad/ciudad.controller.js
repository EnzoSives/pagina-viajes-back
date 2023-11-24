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
exports.CiudadController = void 0;
const common_1 = require("@nestjs/common");
const ciudad_service_1 = require("./ciudad.service");
const create_ciudad_dto_1 = require("./dto/create-ciudad.dto");
let CiudadController = class CiudadController {
    constructor(ciudadService) {
        this.ciudadService = ciudadService;
    }
    async getCities() {
        return this.ciudadService.getAll();
    }
    async getId(id) {
        return this.ciudadService.getId(id);
    }
    addCiudad(ciudad) {
        return this.ciudadService.addCiudad(ciudad);
    }
    updateCiudadId(id, ciudad) {
        return this.ciudadService.updateCiudadId(id, ciudad);
    }
    deleteCiudad(id) {
        return this.ciudadService.deleteCiudad(id);
    }
};
exports.CiudadController = CiudadController;
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CiudadController.prototype, "getCities", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CiudadController.prototype, "getId", null);
__decorate([
    (0, common_1.Post)('crear'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ciudad_dto_1.CiudadDTO]),
    __metadata("design:returntype", Promise)
], CiudadController.prototype, "addCiudad", null);
__decorate([
    (0, common_1.Put)('actualizar/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_ciudad_dto_1.CiudadDTO]),
    __metadata("design:returntype", Promise)
], CiudadController.prototype, "updateCiudadId", null);
__decorate([
    (0, common_1.Delete)('eliminar/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CiudadController.prototype, "deleteCiudad", null);
exports.CiudadController = CiudadController = __decorate([
    (0, common_1.Controller)('ciudad'),
    __metadata("design:paramtypes", [ciudad_service_1.CiudadService])
], CiudadController);
//# sourceMappingURL=ciudad.controller.js.map