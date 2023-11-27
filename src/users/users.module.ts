import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from 'src/blogs/entities/blog.entity';
import { BlogsService } from 'src/blogs/blogs.service';


@Module({
  imports: [TypeOrmModule.forFeature([User,Blog])],
  providers: [UsersService, BlogsService],
  exports: [UsersService]
})
export class UsersModule {}
