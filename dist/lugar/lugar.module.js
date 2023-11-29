"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LugarModule = void 0;
const common_1 = require("@nestjs/common");
const lugar_service_1 = require("./lugar.service");
const lugar_controller_1 = require("./lugar.controller");
const typeorm_1 = require("@nestjs/typeorm");
const ciudad_entity_1 = require("../ciudad/entities/ciudad.entity");
const lugar_entity_1 = require("./entities/lugar.entity");
const preferencia_usuario_entity_1 = require("../preferencia-usuario/entities/preferencia-usuario.entity");
const imagen_entity_1 = require("../imagenes/entities/imagen.entity");
let LugarModule = class LugarModule {
};
exports.LugarModule = LugarModule;
exports.LugarModule = LugarModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([lugar_entity_1.Lugar, ciudad_entity_1.Ciudad, preferencia_usuario_entity_1.PreferenciaUsuario, imagen_entity_1.Imagen])],
        controllers: [lugar_controller_1.LugarController],
        providers: [lugar_service_1.LugarService],
        exports: [lugar_service_1.LugarService]
    })
], LugarModule);
//# sourceMappingURL=lugar.module.js.map