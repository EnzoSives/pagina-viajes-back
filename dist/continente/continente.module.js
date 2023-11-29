"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContinenteModule = void 0;
const common_1 = require("@nestjs/common");
const continente_service_1 = require("./continente.service");
const continente_controller_1 = require("./continente.controller");
const typeorm_1 = require("@nestjs/typeorm");
const pais_entity_1 = require("../pais/entities/pais.entity");
const continente_entity_1 = require("./entities/continente.entity");
let ContinenteModule = class ContinenteModule {
};
exports.ContinenteModule = ContinenteModule;
exports.ContinenteModule = ContinenteModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([continente_entity_1.Continente, pais_entity_1.Pais])],
        controllers: [continente_controller_1.ContinenteController],
        providers: [continente_service_1.ContinenteService],
    })
], ContinenteModule);
//# sourceMappingURL=continente.module.js.map