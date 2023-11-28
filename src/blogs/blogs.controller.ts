import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Blog } from './entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService,
    @InjectRepository(Blog)
  private blogRepository: Repository<Blog>,
  @InjectRepository(User)
  private userRepository: Repository<User>) {}

  @Get('all')
  async getBlogs(): Promise<Blog[]>{
    return this.blogsService.getAll();
  }

  @UseGuards(AuthGuard)
  @Post('crear')
  async addBlog(@Request() req, @Body() blogdto: CreateBlogDto): Promise<Blog> {
    try {
      console.log('Solicitud completa:', req);
      
      const userId = req.user.email;  // Verifica si req.user está presente en la consola
      console.log('ID de usuario:', userId);
  
      const blog = new Blog(blogdto.posteo, blogdto.nombre);
      blog.user = await this.userRepository.findOne({ where: { email: userId } });
      await this.blogRepository.save(blog);
  
      if (blog) {
        return blog;
      } else {
        throw new Error(`No se pudo agregar el blog`);
      }
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: `500 - ERROR: ` + error },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(+id);
  }
}
