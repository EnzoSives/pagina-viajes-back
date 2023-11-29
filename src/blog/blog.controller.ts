import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BlogsService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Blog } from './entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FileInterceptor('imagen'))
  async addBlog(@Request() req, @Body() blogDto: CreateBlogDto, @UploadedFile() imagen: Express.Multer.File): Promise<Blog> {
    try {
      const userId = req.user.email;
      console.log('ID de usuario:', userId);

      const blog = await this.blogsService.createBlog(userId, blogDto, [imagen]);

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