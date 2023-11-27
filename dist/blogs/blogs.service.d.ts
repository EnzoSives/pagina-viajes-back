import { UpdateBlogDto } from './dto/update-blog.dto';
import { User } from 'src/users/entities/user.entity';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
export declare class BlogsService {
    private blogRepository;
    private userRepository;
    constructor(blogRepository: Repository<Blog>, userRepository: Repository<User>);
    getAll(): Promise<Blog[]>;
    getId(id: number): Promise<Blog>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBlogDto: UpdateBlogDto): string;
    remove(id: number): string;
}
