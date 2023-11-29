import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Blog } from './entities/blog.entity';
import { FindOneOptions, Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';
import axios from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class BlogsService {
  constructor(@InjectRepository(Blog)
  private blogRepository: Repository<Blog>,
  @InjectRepository(User)
  private userRepository: Repository<User>)
  {}
  
  public async getAll():Promise<Blog[]>{
    return await this.blogRepository.find();
    }
  
    public async getId(id:number) : Promise<Blog>{
      try{
        const criterio : FindOneOptions =  { where: {id:id} }
        let blog : Blog = await this.blogRepository.findOne( criterio );
        if(blog)
          return blog;
        else
          throw new Error(`No se encontro ciudad con id: ${id}`);
      }
      catch(error){
        throw new HttpException(
          {status: HttpStatus.NOT_FOUND,error:`500 - ERROR: ` +error},
          HttpStatus.NOT_FOUND
        )
      }
    }

    async createBlog(userId: string, blogDto: CreateBlogDto, files: Express.Multer.File[]): Promise<Blog> {
      const blog = new Blog(blogDto.posteo, blogDto.nombre);
      blog.user = await this.userRepository.findOne({ where: { email: userId } });
      const savedBlog = await this.blogRepository.save(blog);
      console.log(savedBlog);
  
      // Agregar la imagen al blog
      if (files && files.length > 0) {
        const imgBbUrl = await this.uploadImageToImgBb(files[0]);
        savedBlog.url_imagen = imgBbUrl;
        await this.blogRepository.save(savedBlog);
      }
  
      return savedBlog;
    }

    private async uploadImageToImgBb(file: Express.Multer.File): Promise<string> {
      const imgBbApiKey = 'b44f4528773f5c89010a350f4400aedc'; 
      const formData = new FormData();
    
      const compressedImageBuffer = await sharp(file.buffer)
        .resize({ width: 40 , height: 40 }) // Ajusta el tamaño según tus necesidades
        .toBuffer();
    
      formData.append('image', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });
    
      try {
        const response = await axios.post('https://api.imgbb.com/1/upload?key=' + imgBbApiKey, formData, {
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
          },
        });
    
        if (response.data && response.data.data && response.data.data.url) {
          const imageUrl = response.data.data.url;
          return imageUrl;
        } else {
          throw new Error('La respuesta de imgBB no contiene la URL esperada.');
        }
      } catch (error) {
        console.error('Error al subir la imagen a imgBB:', error.message);
        throw new Error('Error al subir la imagen a imgBB');
      }
    }
  findAll() {
    return `This action returns all blogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}