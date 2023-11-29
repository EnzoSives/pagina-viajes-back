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
exports.ImagenService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const imagen_entity_1 = require("./entities/imagen.entity");
const lugar_entity_1 = require("../lugar/entities/lugar.entity");
const fs = require("fs");
const path = require("path");
let ImagenService = class ImagenService {
    constructor(imagenRepository, lugarRepository) {
        this.imagenRepository = imagenRepository;
        this.lugarRepository = lugarRepository;
    }
    async guardarImagen(file, imagenDTO) {
        try {
            const lugar = await this.lugarRepository.findOne({ where: { id: imagenDTO.idLugar } });
            if (!lugar) {
                throw new common_1.NotFoundException(`No se pudo agregar la imagen. El lugar con ID ${imagenDTO.idLugar} no fue encontrado.`);
            }
            const imageUrl = this.generateImageUrl(file.filename);
            const imagen = new imagen_entity_1.Imagen(imageUrl);
            imagen.lugar = lugar;
            this.saveImageToServer(file, imageUrl);
            return await this.imagenRepository.save(imagen);
        }
        catch (error) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.INTERNAL_SERVER_ERROR, error: `500 - ERROR: ${error.message}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    generateImageUrl(filename) {
        return `./uploads/${filename}`;
    }
    saveImageToServer(file, imageUrl) {
        const filePath = path.join(__dirname, '..', '..', 'uploads', file.filename);
        fs.writeFileSync(filePath, file.buffer);
    }
};
exports.ImagenService = ImagenService;
exports.ImagenService = ImagenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(imagen_entity_1.Imagen)),
    __param(1, (0, typeorm_1.InjectRepository)(lugar_entity_1.Lugar)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ImagenService);
//# sourceMappingURL=imagenes.service.js.map