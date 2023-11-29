/// <reference types="multer" />
import { BlogsService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
export declare class BlogsController {
    private readonly blogsService;
    private blogRepository;
    private userRepository;
    constructor(blogsService: BlogsService, blogRepository: Repository<Blog>, userRepository: Repository<User>);
    getBlogs(): Promise<Blog[]>;
    addBlog(req: any, blogDto: CreateBlogDto, imagen: Express.Multer.File): Promise<Blog>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateBlogDto: UpdateBlogDto): string;
    remove(id: string): string;
}
