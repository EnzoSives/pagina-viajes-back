import { BlogsService } from './blogs.service';
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
    addBlog(req: any, blogdto: CreateBlogDto): Promise<Blog>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateBlogDto: UpdateBlogDto): string;
    remove(id: string): string;
}
