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
exports.PreferenciaUsuarioController = void 0;
const common_1 = require("@nestjs/common");
const preferencia_usuario_service_1 = require("./preferencia-usuario.service");
const create_preferencia_usuario_dto_1 = require("./dto/create-preferencia-usuario.dto");
const update_preferencia_usuario_dto_1 = require("./dto/update-preferencia-usuario.dto");
let PreferenciaUsuarioController = class PreferenciaUsuarioController {
    constructor(preferenciaUsuarioService) {
        this.preferenciaUsuarioService = preferenciaUsuarioService;
    }
    create(PreferenciaUsuarioDTO) {
        return this.preferenciaUsuarioService.create(PreferenciaUsuarioDTO);
    }
    findAll() {
        return this.preferenciaUsuarioService.findAll();
    }
    findOne(id) {
        return this.preferenciaUsuarioService.findOne(+id);
    }
    update(id, updatePreferenciaUsuarioDto) {
        return this.preferenciaUsuarioService.update(+id, updatePreferenciaUsuarioDto);
    }
    remove(id) {
        return this.preferenciaUsuarioService.remove(+id);
    }
};
exports.PreferenciaUsuarioController = PreferenciaUsuarioController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_preferencia_usuario_dto_1.PreferenciaUsuarioDTO]),
    __metadata("design:returntype", void 0)
], PreferenciaUsuarioController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PreferenciaUsuarioController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PreferenciaUsuarioController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_preferencia_usuario_dto_1.UpdatePreferenciaUsuarioDto]),
    __metadata("design:returntype", void 0)
], PreferenciaUsuarioController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PreferenciaUsuarioController.prototype, "remove", null);
exports.PreferenciaUsuarioController = PreferenciaUsuarioController = __decorate([
    (0, common_1.Controller)('preferencia-usuario'),
    __metadata("design:paramtypes", [preferencia_usuario_service_1.PreferenciaUsuarioService])
], PreferenciaUsuarioController);
//# sourceMappingURL=preferencia-usuario.controller.js.map