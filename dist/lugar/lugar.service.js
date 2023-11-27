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
exports.LugarService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lugar_entity_1 = require("./entities/lugar.entity");
const typeorm_2 = require("typeorm");
const ciudad_entity_1 = require("../ciudad/entities/ciudad.entity");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
let LugarService = class LugarService {
    constructor(lugarRepository, ciudadRepository) {
        this.lugarRepository = lugarRepository;
        this.ciudadRepository = ciudadRepository;
        this.uploadsPath = path.join(__dirname, '..', '..', 'uploads');
    }
    async getAll() {
        return await this.lugarRepository.find();
    }
    async getId(id) {
        try {
            const criterio = { where: { id: id } };
            let lugar = await this.lugarRepository.findOne(criterio);
            if (lugar)
                return lugar;
            else
                throw new Error(`No se encontro ciudad con id: ${id}`);
        }
        catch (error) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.NOT_FOUND, error: `500 - ERROR: ` + error }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async agregarLugar(lugarDTO, files) {
        const lugar = new lugar_entity_1.Lugar(lugarDTO.nombre, lugarDTO.descripcion);
        lugar.ciudad = await this.ciudadRepository.findOne({ where: { id: lugarDTO.id_ciudad } });
        const lugarGuardado = await this.lugarRepository.save(lugar);
        const lugarConIdProvisional = await this.lugarRepository.findOne({
            where: { id: lugarGuardado.id },
        });
        if (!lugarConIdProvisional) {
            throw new Error(`No se pudo obtener el lugar con el ID provisional: ${lugarGuardado.id}`);
        }
        const fileNames = await Promise.all(files.map((file, index) => this.saveImageToServer(file, 'lugar', lugarConIdProvisional.id)));
        lugarConIdProvisional.url_image1 = this.generateImageUrl(fileNames[0]);
        lugarConIdProvisional.url_image2 = this.generateImageUrl(fileNames[1]);
        lugarConIdProvisional.url_image3 = this.generateImageUrl(fileNames[2]);
        lugarConIdProvisional.url_image4 = this.generateImageUrl(fileNames[3]);
        const lugarFinal = await this.lugarRepository.save(lugarConIdProvisional);
        return lugarFinal;
    }
    generateImageUrl(fileName) {
        const filePath = (fileName);
        return filePath.split(path.sep).join('/');
    }
    async saveImageToServer(file, nombre, id) {
        return new Promise((resolve, reject) => {
            const entityFolder = path.join(this.uploadsPath, nombre);
            const entityIdFolder = path.join(entityFolder, id.toString());
            if (!fs.existsSync(entityFolder)) {
                fs.mkdirSync(entityFolder, { recursive: true });
            }
            if (!fs.existsSync(entityIdFolder)) {
                fs.mkdirSync(entityIdFolder, { recursive: true });
            }
            const filePath = path.join(entityIdFolder, `${file.originalname}`);
            sharp(file.buffer)
                .resize({ width: 800, height: 600 })
                .toFile(filePath, (err, info) => {
                if (err) {
                    console.error(`Error al guardar y comprimir la imagen ${file.originalname}: ${err.message}`);
                    reject(err);
                }
                else {
                    console.log(`Imagen ${file.originalname} guardada y comprimida exitosamente en ${filePath}`);
                    resolve(filePath);
                }
            });
        });
    }
    async saveImageToServerWeb(file, nombre, id) {
        return new Promise((resolve, reject) => {
            const entityFolder = path.join(this.uploadsPath, nombre);
            const entityIdFolder = path.join(entityFolder, id.toString());
            if (!fs.existsSync(entityFolder)) {
                fs.mkdirSync(entityFolder, { recursive: true });
            }
            if (!fs.existsSync(entityIdFolder)) {
                fs.mkdirSync(entityIdFolder, { recursive: true });
            }
            const filePath = path.join(entityIdFolder, `${file.originalname}`);
            fs.writeFile(filePath, file.buffer, (err) => {
                if (err) {
                    console.error(`Error al guardar la imagen ${file.originalname}: ${err.message}`);
                    reject(err);
                }
                else {
                    console.log(`Imagen ${file.originalname} guardada exitosamente en ${filePath}`);
                    const urlPath = filePath.split(path.sep).join('/');
                    const imageUrl = `https://www.tusitio.com/${urlPath}`;
                    resolve(imageUrl);
                }
            });
        });
    }
    async updateLugarId(id, lugarDTO) {
        try {
            const criterio = { where: { id: id } };
            let lugar = await this.lugarRepository.findOne(criterio);
            if (lugar) {
                lugar.setNombre(lugarDTO.nombre);
                lugar = await this.lugarRepository.save(lugar);
                return lugar;
            }
            else {
                throw new Error(`No se pudo actualizar el id: ${id}`);
            }
        }
        catch (error) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.NOT_FOUND, error: `500 - ERROR: ` + error }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async deleteLugar(id) {
        try {
            let criterio = { where: { id: id } };
            let lugar = await this.lugarRepository.findOne(criterio);
            if (!lugar)
                throw new Error(`No se pudo actualizar eliminar`);
            else
                await this.lugarRepository.delete(id);
            return true;
        }
        catch (error) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.NOT_FOUND, error: `500 - ERROR: ` + error }, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.LugarService = LugarService;
exports.LugarService = LugarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lugar_entity_1.Lugar)),
    __param(1, (0, typeorm_1.InjectRepository)(ciudad_entity_1.Ciudad)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LugarService);
//# sourceMappingURL=lugar.service.js.map