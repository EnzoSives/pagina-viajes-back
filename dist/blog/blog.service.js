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
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const blog_entity_1 = require("./entities/blog.entity");
const typeorm_2 = require("typeorm");
const sharp = require("sharp");
const axios_1 = require("axios");
const FormData = require("form-data");
let BlogsService = class BlogsService {
    constructor(blogRepository, userRepository) {
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
    }
    async getAll() {
        return await this.blogRepository.find();
    }
    async getId(id) {
        try {
            const criterio = { where: { id: id } };
            let blog = await this.blogRepository.findOne(criterio);
            if (blog)
                return blog;
            else
                throw new Error(`No se encontro ciudad con id: ${id}`);
        }
        catch (error) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.NOT_FOUND, error: `500 - ERROR: ` + error }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async createBlog(userId, blogDto, files) {
        const blog = new blog_entity_1.Blog(blogDto.posteo, blogDto.nombre);
        blog.user = await this.userRepository.findOne({ where: { email: userId } });
        const savedBlog = await this.blogRepository.save(blog);
        console.log(savedBlog);
        if (files && files.length > 0) {
            const imgBbUrl = await this.uploadImageToImgBb(files[0]);
            savedBlog.url_imagen = imgBbUrl;
            await this.blogRepository.save(savedBlog);
        }
        return savedBlog;
    }
    async uploadImageToImgBb(file) {
        const imgBbApiKey = 'b44f4528773f5c89010a350f4400aedc';
        const formData = new FormData();
        const compressedImageBuffer = await sharp(file.buffer)
            .resize({ width: 40, height: 40 })
            .toBuffer();
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
    findAll() {
        return `This action returns all blogs`;
    }
    findOne(id) {
        return `This action returns a #${id} blog`;
    }
    update(id, updateBlogDto) {
        return `This action updates a #${id} blog`;
    }
    remove(id) {
        return `This action removes a #${id} blog`;
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blog_entity_1.Blog)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BlogsService);
//# sourceMappingURL=blog.service.js.map