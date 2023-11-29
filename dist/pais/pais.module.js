"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaisModule = void 0;
const common_1 = require("@nestjs/common");
const pais_service_1 = require("./pais.service");
const pais_controller_1 = require("./pais.controller");
const pais_entity_1 = require("./entities/pais.entity");
const ciudad_entity_1 = require("../ciudad/entities/ciudad.entity");
const typeorm_1 = require("@nestjs/typeorm");
const continente_entity_1 = require("../continente/entities/continente.entity");
let PaisModule = class PaisModule {
};
exports.PaisModule = PaisModule;
exports.PaisModule = PaisModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([pais_entity_1.Pais, ciudad_entity_1.Ciudad, continente_entity_1.Continente])],
        controllers: [pais_controller_1.PaisController],
        providers: [pais_service_1.PaisService],
    })
], PaisModule);
//# sourceMappingURL=pais.module.js.map