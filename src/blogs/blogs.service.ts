import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Blog } from './entities/blog.entity';
import { FindOneOptions, Repository } from 'typeorm';

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
