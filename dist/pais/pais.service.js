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
exports.PaisService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pais_entity_1 = require("./entities/pais.entity");
const continente_entity_1 = require("../continente/entities/continente.entity");
const fs = require("fs");
const path = require("path");
const axios_1 = require("axios");
const FormData = require("form-data");
let PaisService = class PaisService {
    constructor(paisRepository, continenteRepository) {
        this.paisRepository = paisRepository;
        this.continenteRepository = continenteRepository;
        this.uploadsPath = path.join(__dirname, '..', '..', 'uploads');
    }
    async getAll() {
        return await this.paisRepository.find();
    }
    async getId(id) {
        try {
            const criterio = { where: { id: id } };
            let pais = await this.paisRepository.findOne(criterio);
            if (pais)
                return pais;
            else
                throw new Error(`No se encontro ciudad con id: ${id}`);
        }
        catch (error) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.NOT_FOUND, error: `500 - ERROR: ` + error }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async agregarPais(paisDTO, files) {
        const pais = new pais_entity_1.Pais(paisDTO.nombre, paisDTO.descripcion, paisDTO.puntuacion);
        pais.continente = await this.continenteRepository.findOne({ where: { id: paisDTO.id_continente } });
        const paisGuardado = await this.paisRepository.save(pais);
        const paisConIdProvisional = await this.paisRepository.findOne({
            where: { id: paisGuardado.id },
        });
        if (!paisConIdProvisional) {
            throw new Error(`No se pudo obtener el país con el ID provisional: ${paisGuardado.id}`);
        }
        const imgBbUrls = await Promise.all(files.map(async (file, index) => {
            const imgBbUrl = await this.uploadImageToImgBb(file);
            return imgBbUrl;
        }));
        paisConIdProvisional.url_image1 = imgBbUrls[0];
        paisConIdProvisional.url_image2 = imgBbUrls[1];
        paisConIdProvisional.url_image3 = imgBbUrls[2];
        paisConIdProvisional.url_image4 = imgBbUrls[3];
        const paisFinal = await this.paisRepository.save(paisConIdProvisional);
        return paisFinal;
    }
    async uploadImageToImgBb(file) {
        const imgBbApiKey = 'b44f4528773f5c89010a350f4400aedc';
        const formData = new FormData();
        formData.append('image', file.buffer, {
            filename: file.originalname,
            contentType: file.mimetype,
        });
        try {
            const response = await axios_1.default.post('https://api.imgbb.com/1/upload?key=' + imgBbApiKey, formData, {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
                },
            });
            if (response.data && response.data.data && response.data.data.url) {
                const imageUrl = response.data.data.url;
                return imageUrl;
            }
            else {
                throw new Error('La respuesta de imgBB no contiene la URL esperada.');
            }
        }
        catch (error) {
            console.error('Error al subir la imagen a imgBB:', error.message);
            throw new Error('Error al subir la imagen a imgBB');
        }
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
            fs.writeFile(filePath, file.buffer, (err) => {
                if (err) {
                    console.error(`Error al guardar la imagen ${file.originalname}: ${err.message}`);
                    reject(err);
                }
                else {
                    console.log(`Imagen ${file.originalname} guardada exitosamente en ${filePath}`);
                    resolve(filePath);
                }
            });
        });
    }
    async updatePaisId(id, paisDTO) {
        try {
            const criterio = { where: { id: id } };
            let pais = await this.paisRepository.findOne(criterio);
            if (pais) {
                pais.setNombre(paisDTO.nombre);
                pais = await this.paisRepository.save(pais);
                return pais;
            }
            else {
                throw new Error(`No se pudo actualizar el id: ${id}`);
            }
        }
        catch (error) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.NOT_FOUND, error: `500 - ERROR: ` + error }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async deletePais(id) {
        try {
            let criterio = { where: { id: id } };
            let pais = await this.paisRepository.findOne(criterio);
            if (!pais)
                throw new Error(`No se pudo actualizar eliminar`);
            else
                await this.paisRepository.delete(id);
            return true;
        }
        catch (error) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.NOT_FOUND, error: `500 - ERROR: ` + error }, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.PaisService = PaisService;
exports.PaisService = PaisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pais_entity_1.Pais)),
    __param(1, (0, typeorm_1.InjectRepository)(continente_entity_1.Continente)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PaisService);
//# sourceMappingURL=pais.service.js.map