import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaisModule } from './pais/pais.module';
import { LugarModule } from './lugar/lugar.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CiudadModule } from './ciudad/ciudad.module';
import { ContinenteModule } from './continente/continente.module';
import { PreferenciaUsuarioModule } from './preferencia-usuario/preferencia-usuario.module';
import { ImagenesModule } from './imagenes/imagenes.module';
import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './blog/blog.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 
      // 'bpeyvodevjsywngcdapn-mysql.services.clever-cloud.com',
      'localhost',
      port: 3306,
      username: 
      // 'ud9gxrkbn7fiilx5',
      'root',
      password: 
      // 'KwJxKGuGvgADKi3hu8yT',
      '4YwuPbb7W0uxGHg',
      database: 
      // 'bpeyvodevjsywngcdapn',
      'db_tp',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    })
    ,PaisModule, LugarModule, UsersModule, CiudadModule, ContinenteModule, PreferenciaUsuarioModule, ImagenesModule, AuthModule, BlogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
